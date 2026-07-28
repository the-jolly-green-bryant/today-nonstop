import { Injectable } from "@angular/core"
import {
  DialogStream,
  DialogOption,
  DialogStreamEvent,
} from "../classes/dialog-stream"
import { StorageService } from "./storage.service"
import dialog_data from "../game-data/dialog.json"
import { AnalyticsService } from "./analytics.service"

export type StorySpeed = 1 | 0.35 | 0

interface GamePreferences {
  speed_multiplier: StorySpeed
}

@Injectable({
  providedIn: "root",
})
export class DialogStreamService {
  public dialog_stream: DialogStream
  public initialized = false
  public speed_multiplier: StorySpeed = 1
  private load_task: Promise<void> | null = null
  private preferences_loaded = false
  private analytics_enabled = false

  constructor(
    private storage: StorageService,
    private analytics: AnalyticsService,
  ) {
    this.dialog_stream = this.create_dialog_stream()
    this.analytics.initialize()
  }

  private create_dialog_stream(): DialogStream {
    return new DialogStream({
      onSceneEntered: (scene, loopNumber) => {
        if (this.analytics_enabled) {
          this.analytics.trackScene(scene, loopNumber)
        }
      },
      onOptionSelected: (option, loopNumber) => {
        if (this.analytics_enabled) {
          this.analytics.trackChoice(option.scene, option.title, loopNumber)
        }
      },
    })
  }

  /**
   * Either loads events from storage or runs our default scene if no events found.
   *
   * @param {string} default_scene The identifier for our default scene
   */
  public async load_events(
    default_scene = dialog_data.default_scene,
    force_reinitialization = false,
  ): Promise<void> {
    if (this.initialized && !force_reinitialization) {
      return
    }

    if (this.load_task && !force_reinitialization) {
      return await this.load_task
    }

    this.load_task = this.hydrate_events(default_scene)
    try {
      await this.load_task
    } finally {
      this.load_task = null
    }
  }

  private async hydrate_events(default_scene: string): Promise<void> {
    await this.load_preferences()
    this.analytics_enabled = false
    this.dialog_stream = this.create_dialog_stream()
    this.dialog_stream.speed_multiplier = this.speed_multiplier
    const dialog_events = await this.storage.get<DialogStreamEvent[]>(
      this.storage.event_stream_db_key,
    )

    if (!dialog_events?.length) {
      await this.dialog_stream.push_scene(default_scene)
    } else {
      for (const event of dialog_events) {
        if (event.kind === "scene") {
          await this.dialog_stream.push_scene(event.identifier, true)
        }

        if (event.kind === "option") {
          const option = this.dialog_stream.options.find(
            (candidate) => candidate.scene === event.identifier,
          )
          if (option) {
            await this.dialog_stream.select_option(option, true)
          }
        }
      }
    }

    this.analytics_enabled = true
    this.analytics.trackSession(
      dialog_events?.length ? "resume_story" : "new_story",
      dialog_events?.length ?? 0,
    )
    if (!dialog_events?.length) {
      this.analytics.trackScene(default_scene, this.dialog_stream.loop_number)
    }
    this.initialized = true
  }

  /**
   * Select an option and then push the stream to storage.
   *
   * @param {DialogOption} option The option we're selecting
   */
  async select_option(option: DialogOption): Promise<void> {
    await this.dialog_stream.select_option(option)
    await this.storage.set(
      this.storage.event_stream_db_key,
      this.dialog_stream.stream,
    )
  }

  get speed_label() {
    if (this.speed_multiplier === 0) {
      return "Instant"
    }
    if (this.speed_multiplier < 1) {
      return "Fast"
    }
    return "Story pace"
  }

  async cycle_speed(): Promise<void> {
    const speeds: StorySpeed[] = [1, 0.35, 0]
    const current = speeds.indexOf(this.speed_multiplier)
    await this.set_speed(speeds[(current + 1) % speeds.length])
  }

  async set_speed(speed: StorySpeed): Promise<void> {
    this.speed_multiplier = speed
    this.dialog_stream.speed_multiplier = this.speed_multiplier
    await this.storage.set<GamePreferences>(this.storage.preferences_db_key, {
      speed_multiplier: speed,
    })
  }

  private async load_preferences(): Promise<void> {
    if (this.preferences_loaded) {
      return
    }

    const preferences = await this.storage.get<GamePreferences>(
      this.storage.preferences_db_key,
    )
    if ([1, 0.35, 0].includes(preferences?.speed_multiplier)) {
      this.speed_multiplier = preferences.speed_multiplier
    }
    this.preferences_loaded = true
  }

  async start_new_game(): Promise<void> {
    await this.storage.remove(this.storage.event_stream_db_key)
    this.initialized = false
    await this.load_events(dialog_data.default_scene, true)
  }

  async has_saved_game(): Promise<boolean> {
    const events = await this.storage.get<DialogStreamEvent[]>(
      this.storage.event_stream_db_key,
    )
    return Array.isArray(events) && events.length > 0
  }
}

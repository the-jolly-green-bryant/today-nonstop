import { Injectable } from "@angular/core"
import { DialogStream, DialogOption } from "../classes/dialog-stream"
import { StorageService } from "./storage.service"
import dialog_data from "../game-data/dialog.json"

@Injectable({
  providedIn: "root",
})
export class DialogStreamService {
  public dialog_stream: DialogStream = null
  public initialized = false
  public speed_multiplier = 1

  constructor(private storage: StorageService) {
    this.dialog_stream = new DialogStream()
  }

  /**
   * Either loads events from storage or runs our default scene if no events found.
   *
   * @param {string} default_scene The identifier for our default scene
   */
  public async load_events(
    default_scene = dialog_data.default_scene,
    force_reinitialization = false,
  ) {
    // If we're already initialized, this is good.
    if (this.initialized && !force_reinitialization) {
      return
    }

    this.dialog_stream = new DialogStream()
    this.dialog_stream.speed_multiplier = this.speed_multiplier
    // await this.storage.clear()  // Uncomment to clear storage.
    const dialog_events = await this.storage.get(
      this.storage.event_stream_db_key,
    )

    // If we don't have dialog events, push our default scene
    if (!dialog_events) {
      await this.dialog_stream.push_scene(default_scene)
    }

    // Otherwise, load our dialog event stream and simulate each event.
    else {
      for (const i in dialog_events) {
        if (Object.prototype.hasOwnProperty.call(dialog_events, i)) {
          const event_object = dialog_events[i]

          if (event_object.kind === "scene") {
            await this.dialog_stream.push_scene(event_object.identifier, true)
          }

          if (event_object.kind === "option") {
            for (const k in this.dialog_stream.options) {
              if (
                Object.prototype.hasOwnProperty.call(
                  this.dialog_stream.options,
                  k,
                )
              ) {
                const option = this.dialog_stream.options[k]
                if (option.scene !== event_object.identifier) {
                  continue
                }

                await this.dialog_stream.select_option(option, true)
                break
              }
            }
          }
        }
      }
    }

    this.initialized = true
  }

  /**
   * Select an option and then push the stream to storage.
   *
   * @param {DialogOption} option The option we're selecting
   */
  async select_option(option: DialogOption) {
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

  cycle_speed() {
    const speeds = [1, 0.35, 0]
    const current = speeds.indexOf(this.speed_multiplier)
    this.speed_multiplier = speeds[(current + 1) % speeds.length]
    this.dialog_stream.speed_multiplier = this.speed_multiplier
  }

  async start_new_game() {
    await this.storage.clear()
    this.initialized = false
    await this.load_events(dialog_data.default_scene, true)
  }

  async has_saved_game() {
    const events = await this.storage.get(this.storage.event_stream_db_key)
    return Array.isArray(events) && events.length > 0
  }
}

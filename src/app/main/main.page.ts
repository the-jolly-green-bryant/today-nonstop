import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
  standalone: false,
  selector: "app-main",
  templateUrl: "main.page.html",
  styleUrls: ["main.page.scss"],
})
export class MainPage {
  constructor(public dialog_stream_service: DialogStreamService) {}

  ngOnInit() {
    this.load_dialog_stream()
  }

  load_dialog_stream() {
    this.dialog_stream_service.load_events(dialog_data.default_scene)
  }

  get lives_lived() {
    return Math.max(
      1,
      this.dialog_stream_service.dialog_stream?.inventory.find(
        (item) => item.identifier === "lives_lived",
      )?.quantity ?? 1,
    )
  }

  get speed_label() {
    return this.dialog_stream_service.speed_label
  }

  get speed_icon() {
    return this.dialog_stream_service.speed_multiplier === 0
      ? "play-forward"
      : "speedometer-outline"
  }

  get memories_recovered() {
    const lifecycleItems = new Set([
      "lives_lived",
      "finished_once",
      "system_reboots",
      "escaped_loop",
    ])
    return (
      this.dialog_stream_service.dialog_stream?.inventory.filter(
        (item) =>
          item.persists &&
          !item.hidden &&
          item.quantity > 0 &&
          !lifecycleItems.has(item.identifier),
      ).length ?? 0
    )
  }

  get current_scene() {
    return (
      [...(this.dialog_stream_service.dialog_stream?.stream ?? [])]
        .reverse()
        .find((event) => event.kind === "option" || event.kind === "scene")
        ?.identifier ?? "1010__START"
    )
  }

  get location_label() {
    const scene = this.current_scene
    if (/^13/.test(scene)) return "The bell heist"
    if (/^12/.test(scene)) return "The impossible fair"
    if (/^11/.test(scene)) return "The memory bridge"
    if (/^103/.test(scene)) return "The tournament"
    if (/^104|^106|^108/.test(scene)) return "The repeating cry"
    if (/^105/.test(scene)) return "The crowned court"
    if (/^102/.test(scene)) return "The impossible road"
    if (/^20/.test(scene)) return "Tomorrow"
    return "The repeating day"
  }

  get story_chapter() {
    const scene = this.current_scene
    if (/^13/.test(scene)) return "is-heist"
    if (/^12/.test(scene)) return "is-market"
    if (/^11/.test(scene)) return "is-memory"
    if (/^102/.test(scene)) return "is-road"
    if (/^20/.test(scene)) return "is-tomorrow"
    return "is-storm"
  }

  async cycle_speed(): Promise<void> {
    await this.dialog_stream_service.cycle_speed()
  }
}

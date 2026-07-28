import { Component } from "@angular/core"
import { DialogCommand } from "../../classes/dialog-stream"
import { DialogStreamService } from "../../services/dialog-stream.service"

@Component({
  standalone: false,
  selector: "app-dialog-stream",
  templateUrl: "./dialog-stream.component.html",
  styleUrls: ["./dialog-stream.component.scss"],
})
export class DialogStreamComponent {
  private last_rendered_size = 0

  constructor(public dialog_stream_service: DialogStreamService) {}

  is_narration(item: DialogCommand): boolean {
    return (
      item.command === "SHOW_TEXT" &&
      typeof item.argument === "string" &&
      /^\[.*\]$/.test(item.argument)
    )
  }

  is_continuation(index: number): boolean {
    const feed = this.dialog_stream_service.dialog_stream?.feed ?? []
    const item = feed[index]
    if (item?.command !== "SHOW_TEXT" || this.is_narration(item)) {
      return false
    }

    for (let previousIndex = index - 1; previousIndex >= 0; previousIndex--) {
      const previous = feed[previousIndex]
      if (["DELAY", "ADD_ITEM", "CLEAR_INVENTORY"].includes(previous.command)) {
        continue
      }
      if (previous.command === "SHOW_TEXT") {
        return (
          !this.is_narration(previous) &&
          previous.speaker?.identifier === item.speaker?.identifier
        )
      }
      return false
    }
    return false
  }

  option_badge(scene: string): string {
    const badges: Record<string, string> = {
      "1110__EASTER_EGG_ENDING": "Dangerous",
      "1140__FAKE_WORLD": "Remembered",
      "1171__ENDGAME": "Changes tomorrow",
      "1172__ENDGAME": "Changes tomorrow",
      "1300__BELL_HEIST": "New path",
      "1361__BELL_HEIST": "Likely fatal",
      "1362__BELL_HEIST": "Final choice",
      "1363__BELL_HEIST": "Final choice",
      "2000__START": "Tomorrow",
    }
    return badges[scene] ?? "Choose your path"
  }

  /**
   * After the dialog stream is updated, scroll to the bottom (so we can see the most
   * recent message).
   */
  ngAfterViewChecked() {
    const feed_size = this.dialog_stream_service.dialog_stream
      ? this.dialog_stream_service.dialog_stream.feed.length
      : 0
    const option_size = this.dialog_stream_service.dialog_stream
      ? this.dialog_stream_service.dialog_stream.options.length
      : 0
    const rendered_size = feed_size + option_size
    if (rendered_size && rendered_size !== this.last_rendered_size) {
      this.last_rendered_size = rendered_size
      const target =
        document.getElementById("dialog-stream-option-container")
          ?.lastElementChild ??
        document.querySelector(".dialog-stream-item:last-of-type")
      target?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
  }
}

import { Component } from "@angular/core"
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

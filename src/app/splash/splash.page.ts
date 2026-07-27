import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
  standalone: false,
  selector: "app-splash-page",
  templateUrl: "splash.page.html",
  styleUrls: ["splash.page.scss"],
})
export class SplashPage {
  constructor(public dialog_stream_service: DialogStreamService) {}

  ngOnInit() {
    this.load_dialog_stream()
  }

  load_dialog_stream() {
    this.dialog_stream_service.load_events(dialog_data.default_scene)
  }
}

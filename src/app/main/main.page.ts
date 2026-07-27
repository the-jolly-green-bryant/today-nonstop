import { Component } from "@angular/core"
import { AlertController } from "@ionic/angular"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
  standalone: false,
  selector: "app-main",
  templateUrl: "main.page.html",
  styleUrls: ["main.page.scss"],
})
export class MainPage {
  constructor(
    public dialog_stream_service: DialogStreamService,
    private alert_controller: AlertController,
  ) {}

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

  cycle_speed() {
    this.dialog_stream_service.cycle_speed()
  }

  async confirm_restart() {
    const alert = await this.alert_controller.create({
      header: "Start over?",
      message:
        "This clears every remembered loop, character, item, and unlocked path.",
      buttons: [
        { text: "Keep playing", role: "cancel" },
        {
          text: "Start over",
          role: "destructive",
          handler: () => this.dialog_stream_service.start_new_game(),
        },
      ],
    })
    await alert.present()
  }
}

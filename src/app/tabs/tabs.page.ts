import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AlertController, MenuController } from "@ionic/angular"
import {
  DialogStreamService,
  StorySpeed,
} from "../services/dialog-stream.service"

@Component({
  standalone: false,
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  readonly release = "1.6"
  reset_in_progress = false

  constructor(
    public dialog_stream_service: DialogStreamService,
    private alert_controller: AlertController,
    private menu_controller: MenuController,
    private router: Router,
  ) {}

  async set_speed(speed: StorySpeed): Promise<void> {
    await this.dialog_stream_service.set_speed(speed)
  }

  async navigate(path: string): Promise<void> {
    await this.menu_controller.close("game-menu")
    await this.router.navigate([path])
  }

  async confirm_restart(): Promise<void> {
    const alert = await this.alert_controller.create({
      header: "Begin a new loop?",
      message:
        "This erases the current story and every remembered life. Reading preferences stay intact.",
      buttons: [
        { text: "Keep playing", role: "cancel" },
        {
          text: "Erase all memories",
          role: "destructive",
          handler: () => void this.erase_story(),
        },
      ],
    })
    await alert.present()
  }

  private async erase_story(): Promise<void> {
    if (this.reset_in_progress) {
      return
    }
    this.reset_in_progress = true
    await this.menu_controller.close("game-menu")
    await this.dialog_stream_service.start_new_game()
    await this.router.navigateByUrl("/game/tabs/main", { replaceUrl: true })
    this.reset_in_progress = false
  }
}

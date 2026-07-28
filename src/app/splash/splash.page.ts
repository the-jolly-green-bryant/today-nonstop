import { Component } from "@angular/core"
import { Router } from "@angular/router"
import {
  DialogStreamService,
  StorySummary,
} from "../services/dialog-stream.service"

@Component({
  standalone: false,
  selector: "app-splash-page",
  templateUrl: "splash.page.html",
  styleUrls: ["splash.page.scss"],
})
export class SplashPage {
  has_saved_game = false
  story_summary: StorySummary | null = null

  constructor(
    public dialog_stream_service: DialogStreamService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.has_saved_game = await this.dialog_stream_service.has_saved_game()
    this.story_summary = await this.dialog_stream_service.get_story_summary()
  }

  async continue_game() {
    await this.dialog_stream_service.load_events()
    await this.router.navigate(["/game/tabs/main"])
  }

  async start_game() {
    await this.dialog_stream_service.start_new_game()
    await this.router.navigate(["/game/tabs/main"])
  }
}

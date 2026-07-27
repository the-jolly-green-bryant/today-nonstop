import { ActivatedRoute } from "@angular/router"
import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
  standalone: false,
  selector: "app-character-detail-page",
  templateUrl: "character-detail.page.html",
  styleUrls: ["character-detail.page.scss"],
})
export class CharacterDetailPage {
  public identifier: string = null

  constructor(
    public dialog_stream_service: DialogStreamService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.load_dialog_stream()

    const route_params = this.route.snapshot.paramMap
    this.identifier = route_params.get("identifier")
  }

  load_dialog_stream() {
    this.dialog_stream_service.load_events(dialog_data.default_scene)
  }
}

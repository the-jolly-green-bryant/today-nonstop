import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
    selector: "app-inventory-page",
    templateUrl: "inventory.page.html",
    styleUrls: ["inventory.page.scss"],
})
export class InventoryPage {

    constructor(public dialog_stream_service: DialogStreamService) {}

    ngOnInit() {
        this.load_dialog_stream()
    }

    load_dialog_stream() {
        this.dialog_stream_service.load_events(dialog_data.default_scene)
    }

}

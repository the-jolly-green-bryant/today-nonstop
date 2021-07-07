import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"

@Component({
    selector: "app-inventory-page",
    templateUrl: "inventory.page.html",
    styleUrls: ["inventory.page.scss"],
})
export class InventoryPage {

    constructor(public dialog_stream_service: DialogStreamService) {}

}

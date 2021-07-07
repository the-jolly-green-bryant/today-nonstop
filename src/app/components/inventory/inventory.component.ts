import { Component, OnInit, Input } from "@angular/core"
import { DialogStream, DialogOption } from "../../classes/dialog-stream"

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {

    @Input() stream: DialogStream = null

    constructor() { }

    ngOnInit() {}
}

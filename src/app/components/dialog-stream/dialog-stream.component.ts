import { Component, OnInit, Input } from "@angular/core"
import { DialogStream, DialogOption } from "../../classes/dialog-stream"

@Component({
    selector: "app-dialog-stream",
    templateUrl: "./dialog-stream.component.html",
    styleUrls: ["./dialog-stream.component.scss"],
})
export class DialogStreamComponent implements OnInit {

    @Input() stream: DialogStream = null

    constructor() { }

    ngOnInit() {}
}

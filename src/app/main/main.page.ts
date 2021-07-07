import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"

@Component({
    selector: "app-main",
    templateUrl: "main.page.html",
    styleUrls: ["main.page.scss"]
})
export class MainPage {

    constructor(public dialog_stream_service: DialogStreamService) {}

    ngOnInit() {
        this.load_dialog_stream()
    }

    load_dialog_stream() {
        this.dialog_stream_service.load_events("wakeup")
    }

}

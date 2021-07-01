import { Component } from "@angular/core"
import { DialogStream } from "../classes/dialog-stream"

@Component({
    selector: "app-main",
    templateUrl: "main.page.html",
    styleUrls: ["main.page.scss"]
})
export class MainPage {

    dialog_stream: DialogStream = null

    constructor() {
        this.dialog_stream = new DialogStream()
        // this.dialog_stream.push_scene("eat_breakfast")
        this.dialog_stream.push_scene("wakeup")
    }

}

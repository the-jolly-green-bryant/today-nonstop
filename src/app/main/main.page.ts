import { Component } from "@angular/core"
import * as dialog_data from "../game-data/dialog.json"

@Component({
    selector: "app-main",
    templateUrl: "main.page.html",
    styleUrls: ["main.page.scss"]
})
export class MainPage {

    current_scene: string = null

    constructor() {
        this.current_scene = "wakeup"
        console.log("dialog_data", dialog_data)
    }

}

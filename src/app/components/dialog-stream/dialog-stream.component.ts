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

    ngAfterViewChecked() {
        const feed_size = this.stream ? this.stream.feed.length : 0
        const option_size = this.stream ? this.stream.options.length : 0
        if (feed_size || option_size) {
            const target = document.getElementById("dialog-stream-scroller")
            target.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
    }
}

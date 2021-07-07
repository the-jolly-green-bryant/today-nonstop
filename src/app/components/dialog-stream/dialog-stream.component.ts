import { Component, OnInit, Input } from "@angular/core"
import { DialogStream, DialogOption } from "../../classes/dialog-stream"
import { DialogStreamService } from "../../services/dialog-stream.service"

@Component({
    selector: "app-dialog-stream",
    templateUrl: "./dialog-stream.component.html",
    styleUrls: ["./dialog-stream.component.scss"],
})
export class DialogStreamComponent implements OnInit {

    constructor(public dialog_stream_service: DialogStreamService) {}

    ngOnInit() {}

    /**
     * After the dialog stream is updated, scroll to the bottom (so we can see the most
     * recent message).
     */
    ngAfterViewChecked() {
        const feed_size = this.dialog_stream_service.dialog_stream ? this.dialog_stream_service.dialog_stream.feed.length : 0
        const option_size = this.dialog_stream_service.dialog_stream ? this.dialog_stream_service.dialog_stream.options.length : 0
        if (feed_size || option_size) {
            const target = document.getElementById("dialog-stream-scroller")
            target.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
    }
}

import { Injectable } from "@angular/core"
import { DialogStream, DialogOption } from "../classes/dialog-stream"
import { StorageService } from "./storage.service"

@Injectable({
    providedIn: "root",
})
export class DialogStreamService {

    public dialog_stream: DialogStream = null

    constructor(private storage: StorageService) {
        this.dialog_stream = new DialogStream()
    }

    public async load_events(default_scene: string) {
        const dialog_events = await this.storage.get(this.storage.event_stream_db_key)
        if (!dialog_events) {
            // If we don't have dialog events, push our default scene
            return this.dialog_stream.push_scene(default_scene)
        }

        console.log("dialog_events", dialog_events)
        for (const index in dialog_events) {
            const event_object = dialog_events[index]
            console.log("event_object", event_object)

            if (event_object.kind === "scene") {
                this.dialog_stream.push_scene(event_object.identifier, true)
            }

            if (event_object.kind === "option") {
                console.log("looking at options", this.dialog_stream)
                // TODO - This loop never enters for some reason. I suspect it's not populated at the time of execution.
                for (const index in this.dialog_stream.options) {
                    const option = this.dialog_stream.options[index]
                    console.log('option', option)
                    this.dialog_stream.select_option(option)
                }
            }
        }
    }

    /**
     * Select an option and then push the stream to storage.
     *
     * @param {DialogOption} option The option we're selecting
     */
    async select_option(option: DialogOption) {
        await this.dialog_stream.select_option(option)
        await this.storage.set(this.storage.event_stream_db_key, this.dialog_stream.stream)
    }
}

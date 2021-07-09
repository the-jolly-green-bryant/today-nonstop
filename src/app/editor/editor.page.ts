import { Component } from "@angular/core"
import { DialogStreamService } from "../services/dialog-stream.service"
import dialog_data from "../game-data/dialog.json"

@Component({
    selector: "app-editor-page",
    templateUrl: "editor.page.html",
    styleUrls: ["editor.page.scss"],
})
export class EditorPage {

    public game_data: any = null
    public tab = "dialog"

    constructor() {}

    ngOnInit() {
        this.game_data = JSON.parse(JSON.stringify(dialog_data))
    }

    add_character() {
        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        this.game_data.characters[random_key] = {
            name: "",
            avatar: "",
        }
    }

    remove_character(key: string) {
        // TODO - Check if this is used anywhere.
        delete this.game_data.characters[key]
    }

    add_item() {
        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        this.game_data.items[random_key] = {
            name: "",
            avatar: "",
            always_show_chip: false,
            is_status: false,
            hidden: false,
        }
    }

    remove_item(key: string) {
        // TODO - Check if this is used anywhere.
        delete this.game_data.items[key]
    }

    add_image() {
        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        this.game_data.keyed_images[random_key] = ""
    }

    remove_image(key: string) {
        // TODO - Check if this is used anywhere.
        delete this.game_data.keyed_images[key]
    }

    add_dialog() {
        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        this.game_data.dialog[random_key] = {
            comment: "",
            speaker: null,
            dialog: [],
            next: {},
        }
    }

    remove_dialog(key: string) {
        // TODO - Check if this is used anywhere.
        delete this.game_data.dialog[key]
    }

    add_skiptoif_to_dialog(dialog: any) {
        if (!dialog.skip_to_if) {
            dialog.skip_to_if = {}
        }

        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        dialog.skip_to_if[random_key] = {
            consumes_item: false,
        }
    }

    add_next_to_dialog(dialog: any) {
        if (!dialog.next) {
            dialog.next = {}
        }

        // TODO - We want this at the end, ideally. Currently gets added randomly.
        const random_key = Math.random().toString(36).substring(7)
        dialog.next[random_key] = {
            title: null,
            dialog: [],
        }
    }

}

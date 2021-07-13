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

    change_key(obj, previous_key, new_key) {
        const value = JSON.parse(JSON.stringify(obj[previous_key]))
        delete obj[previous_key]
        obj[new_key] = value
    }

    track_by_fn(index: any, item: any) {
        return index
    }

    add_character() {
        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
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
        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
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
        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
        this.game_data.keyed_images[random_key] = ""
    }

    remove_image(key: string) {
        // TODO - Check if this is used anywhere.
        delete this.game_data.keyed_images[key]
    }

    add_dialog() {
        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
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

        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
        dialog.skip_to_if[random_key] = {
            consumes_item: false,
            quantity: 1,
        }
    }

    add_next_to_dialog(dialog: any) {
        if (!dialog.next) {
            dialog.next = {}
        }

        const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
        dialog.next[random_key] = {
            title: null,
            dialog: [],
        }
    }

    print_game_data() {
        console.log(this.game_data)
        const printed_data = JSON.stringify(this.game_data, null, 4)
        this.copy_message(printed_data)
    }

    copy_message(val: string){
        const text_box = document.createElement("textarea")
        text_box.style.position = "fixed"
        text_box.style.left = "0"
        text_box.style.top = "0"
        text_box.style.opacity = "0"
        text_box.value = val
        document.body.appendChild(text_box)
        text_box.focus()
        text_box.select()
        document.execCommand("copy")
        document.body.removeChild(text_box)
    }

}

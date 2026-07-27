import { Component } from "@angular/core"
import dialog_data from "../game-data/dialog.json"

@Component({
  standalone: false,
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

  /**
   * Changes the key for a property on an object.
   *
   * @param {any}    obj          The object we're updating
   * @param {string} previous_key The old key to reference
   * @param {string} new_key      The new key to use
   */
  change_key(obj: any, previous_key: string, new_key: string) {
    const value = JSON.parse(JSON.stringify(obj[previous_key]))
    delete obj[previous_key]
    obj[new_key] = value
  }

  /**
   * Fixes flat array loops so new items are tracked properly.
   *
   * @param {any} index The index of the array item we're looking at
   * @param {any} item  The value of the array item we're looking at
   */
  track_by_fn(index: any, _item: any) {
    return index
  }

  /**
   * Adds a new blank character to the game data.
   */
  add_character() {
    const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
    this.game_data.characters[random_key] = {
      name: "",
      avatar: "",
      description: "",
    }
  }

  /**
   * Adds a blank discoverable to the character.
   *
   * @param {any} character The character object we want to add a discoverable to
   */
  add_discoverable_to_character(character: any) {
    if (!character.discoverables) {
      character.discoverables = {}
    }

    const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
    character.discoverables[random_key] = {
      description: "",
      minimum_quantity: 1,
    }
  }

  /**
   * Removes a discoverable from the given character.
   *
   * @param {any}    character        The character we're referencing
   * @param {string} discoverable_key The key for the discoverable
   */
  remove_discoverable_from_character(character: any, discoverable_key: string) {
    delete character.discoverables[discoverable_key]
  }

  /**
   * Removes a character at the given key
   *
   * @param {string} key The key we're referencing
   */
  remove_character(key: string) {
    // TODO - Check if this is used anywhere.
    delete this.game_data.characters[key]
  }

  /**
   * Adds a new blank item to the game data.
   */
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

  /**
   * Removes an item at the given key.
   *
   * @param {string} key The key we're referencing
   */
  remove_item(key: string) {
    // TODO - Check if this is used anywhere.
    delete this.game_data.items[key]
  }

  /**
   * Adds a new blank image at the given key.
   */
  add_image() {
    const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
    this.game_data.keyed_images[random_key] = ""
  }

  /**
   * Removes an image at the given key.
   *
   * @param {string} key The key we're referencing
   */
  remove_image(key: string) {
    // TODO - Check if this is used anywhere.
    delete this.game_data.keyed_images[key]
  }

  /**
   * Adds a new blank dialog at the given key.
   */
  add_dialog() {
    const random_key = "zzzzz__" + Math.random().toString(36).substring(7)
    this.game_data.dialog[random_key] = {
      comment: "",
      speaker: null,
      dialog: [],
      next: {},
    }
  }

  /**
   * Removes a dialog at the given key.
   *
   * @param {string} key The key we're referencing
   */
  remove_dialog(key: string) {
    // TODO - Check if this is used anywhere.
    delete this.game_data.dialog[key]
  }

  /**
   * Adds a new skip condition to the given dialog.
   *
   * @param {any} dialog The dialog object we're referencing
   */
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

  /**
   * Removes the given skiptoif from the dialog.
   *
   * @param {any}    dialog       The dialog object we're referencing
   * @param {[type]} skiptoif_key The key for the skiptoif we want removed
   */
  remove_skiptoif_from_dialog(dialog: any, skiptoif_key) {
    delete dialog.skip_to_if[skiptoif_key]
  }

  /**
   * Adds a new option to the given dialog.
   *
   * @param {any} dialog The dialog object we're referencing
   */
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

  /**
   * Prints game data to console (for debugging) and copies it to the clipboard.
   */
  print_game_data() {
    console.log(this.game_data)
    const printed_data = JSON.stringify(this.game_data, null, 4)
    this.copy_message(printed_data)
  }

  /**
   * Copies the given string value to the clipboard.
   *
   * @param {string} val The string we're copying
   */
  copy_message(val: string) {
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

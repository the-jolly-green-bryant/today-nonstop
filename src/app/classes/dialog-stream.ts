import dialog_data from "../game-data/dialog.json"

export class DialogStream {
    /**
     * A collection of events that have occurred in this stream which permits us to
     * "replay" the stream (handy for saved games).
     *
     * @type {DialogStreamEvent[]}
     */
    stream: DialogStreamEvent[] = []

    /**
     * The rendered collection of strings (or stringified commands).
     *
     * @type {string[]}
     */
    public feed: DialogCommand[] = []

    /**
     * Any options that should be displayed to the player.
     *
     * @type {DialogOption[]}
     */
    public options: DialogOption[] = []

    /**
     * All items in the player's inventory.
     *
     * @type {InventoryItem[]}
     */
    public inventory: InventoryItem[] = []

    /**
     * The last active speaker
     *
     * @type {DialogSpeaker}
     */
    last_speaker: DialogSpeaker = null

    /**
     * The number of seconds to wait between rendering dialog lines.
     *
     * @type {Number}
     */
    SECONDS_BETWEEN_DIALOG_LINES = 1.5

    /**
     * The number of seconds to wait between running scenes.
     *
     * @type {Number}
     */
    SECONDS_BETWEEN_SCENES = 3.5

    /**
     * Pushes a scene onto the event stream and begins rendering it.
     *
     * @param {string} scene The string identifier for the scene
     */
    push_scene(scene: string) {
        console.log(`Pushing Scene: ${scene}`)
        this.stream.push(new DialogStreamEvent("scene", scene))
        setTimeout(() => { this.run_scene(scene) }, this.SECONDS_BETWEEN_SCENES * 1000)
    }

    /**
     * Renders a scene and processes its conclusion.
     *
     * @param {string} scene The string identifier for the scene
     */
    async run_scene(scene: string) {
        const scene_object = dialog_data.dialog[scene]

        // Check if we need to skip this scene.
        if (dialog_data.dialog[scene].skip_to_if) {
            for (const key in scene_object.skip_to_if) {
                if (this.has_inventory_item(key)) {
                    // We have the item. Consume it (if necessary) and go to the next scene.
                    const skip_directions = scene_object.skip_to_if[key]
                    if (skip_directions.consumes_item) {
                        this.remove_inventory_item(key, 1)
                    }

                    return this.run_scene(skip_directions.target)
                }
            }
        }

        console.log(`Running Scene: ${scene}`)
        await this.render_lines(scene_object.dialog)
        this.end_scene(scene)
    }

    /**
     * Pushes our lines at a paced pattern into the feed.
     *
     * @param {string[]} lines An array of lines to render
     */
    async render_lines(lines: string[]) {
        for (const line of lines) {
            console.log(`Pushing Line: ${line}`)
            const item = this.parse_feed_item(line)

            // If our item is an asset that must be loaded remotely, do so.
            if (item.command === "SHOW_IMAGE" || item.command === "FLASH_IMAGE") {
                const base64 = await this.load_image_to_base64(item.argument)
                item.argument = base64
            }

            this.feed.push(item)

            if (item.command === "DELAY") {
                // Wait our given number of seconds.
                await this.delay(parseFloat(item.argument) * 1000)
            } else if (item.command === "ADD_ITEM") {
                // Add our item to inventory.
                this.add_inventory_item(item.argument, 1)
                console.log(this.inventory)
            } else if (item.command !== "SET_SPEAKER" && item.command !== "ADD_ITEM") {
                // If nothing else, wait our normal time between lines.
                await this.delay(this.SECONDS_BETWEEN_DIALOG_LINES * 1000)
            }
        }
    }

    /**
     * Adds the given item to our inventory, incrementing quantities if needed.
     *
     * @param {string} identifier The item we want to add
     * @param {number} quantity   The quantity we want to add
     */
    add_inventory_item(identifier: string, quantity: number) {
        for (const item of this.inventory) {
            if (item.identifier === identifier) {
                item.quantity += quantity
                return
            }
        }

        this.inventory.push(new InventoryItem(identifier, quantity))
    }

    remove_inventory_item(identifier: string, quantity: number) {
        for (const item of this.inventory) {
            if (item.identifier === identifier && item.quantity >= quantity) {
                item.quantity -= quantity
                return
            }
        }
    }

    /**
     * Determines whether we have the required item.
     *
     * @param {string} identifier The item we're seeking.
     */
    has_inventory_item(identifier: string) {
        for (const item of this.inventory) {
            if (item.identifier === identifier && item.quantity >= 1) {
                return true
            }
        }

        return false
    }

    /**
     * Loads our image from a remote source and converts it to base64.
     *
     * @param {string} src The URL for the image we want to load
     */
    async load_image_to_base64(src: string) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.crossOrigin = "Anonymous"
            img.onload = () => {
                let canvas = document.createElement("canvas")
                let ctx = canvas.getContext("2d")
                canvas.height = img.naturalHeight
                canvas.width = img.naturalWidth
                ctx.drawImage(img, 0, 0)
                resolve(canvas.toDataURL())
            }
            img.onerror = reject
            img.src = src
        })
    }

    /**
     * Concludes our scene, either moving to the next scene or presenting options.
     *
     * @param {string} scene The string identifier for the scene
     */
    async end_scene(scene: string) {
        const scene_object = dialog_data.dialog[scene]
        if (!scene_object.next || Object.keys(scene_object.next).length === 0) {
            // TODO - We have nowhere to go! We've reached the end of the game.
            console.log("\n\n!!! WE HAVE REACHED A DEAD END !!!\n\n")
            return
        }

        else if (Object.keys(scene_object.next).length === 1) {
            // There is only one option, automatically progress towards it.
            const new_scene = Object.keys(scene_object.next)[0]
            await this.render_lines(scene_object.next[new_scene].dialog)
            return this.run_scene(new_scene)
        }

        else {
            // Add any relevant options to our stream.
            for (const key of Object.keys(scene_object.next)) {
                const optional_scene = scene_object.next[key]
                this.options.push(new DialogOption(key, optional_scene.title, optional_scene.dialog))
            }

            return
        }
    }

    /**
     * Selects the given option, clearing all available options.
     *
     * @param {DialogOption} option The option we want to select
     */
    async select_option(option: DialogOption) {
        this.options = []
        await this.render_lines(option.dialog)
        return this.run_scene(option.scene)
    }

    /**
     * Parses a command and returns a usable command object. If the command
     * can't be parsed, render it as text.
     *
     * @param  {string}        item The string command we're interpreting
     * @return {DialogCommand}      The usable command object
     */
    parse_feed_item(item: string): DialogCommand {
        let command = "SHOW_TEXT"
        let argument = item

        const command_regex = /\[\[(.*)\]\](.*)/
        if (command_regex.test(item)) {
            const match = item.match(command_regex)
            command = match[1]
            argument = match[2]

            if (command === "SET_SPEAKER") {
                const character = dialog_data.characters[argument]
                this.last_speaker = new DialogSpeaker(character.avatar, character.name, argument)
            }
        }

        return new DialogCommand(command, argument, item, this.last_speaker)
    }

    /**
     * Delays for the given number of milliseconds before resolving.
     *
     * @param {number} milliseconds The amount of time to wait.
     */
    delay(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

export class DialogStreamEvent {
    public kind: string = null
    public identifier: string = null

    constructor(kind, identifier) {
        this.kind = kind
        this.identifier = identifier
    }
}

export class DialogOption {
    public scene: string = null
    public title: string = null
    public dialog: string[] = null

    constructor(scene, title, dialog) {
        this.scene = scene
        this.title = title
        this.dialog = dialog
    }
}

export class DialogCommand {
    public command: string = null
    public argument: any = null
    public raw: string = null
    public speaker: DialogSpeaker = null

    constructor(command: string, argument: any, raw: string, speaker: DialogSpeaker) {
        this.command = command
        this.argument = argument
        this.raw = raw
        this.speaker = JSON.parse(JSON.stringify(speaker))
    }
}

export class DialogSpeaker {
    public avatar: string = null
    public name: string = null
    public identifier: string = null

    constructor(avatar, name, identifier) {
        this.avatar = avatar
        this.name = name
        this.identifier = identifier
    }
}

export class InventoryItem {
    public identifier: string = null
    public quantity: number = null

    constructor(identifier, quantity=1) {
        this.identifier = identifier
        this.quantity = quantity
    }
}

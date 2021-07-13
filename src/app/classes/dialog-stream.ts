import dialog_data from "../game-data/dialog.json"

export class DialogStream {
    /**
     * A collection of events that have occurred in this stream which permits us to
     * "replay" the stream (handy for saved games).
     *
     * @type {DialogStreamEvent[]}
     */
    public stream: DialogStreamEvent[] = []

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
     * All characters the player has met.
     *
     * @type {DialogSpeaker[]}
     */
    public characters: DialogSpeaker[] = []

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
     * A list of valid commands
     *
     * @type {string[]}
     */
    WHITELISTED_COMMANDS: string[] = [
        "ADD_ITEM",
        "DELAY",
        "EMOTE",
        "FLASH_IMAGE",
        "FLASH_ITEM",
        "SET_SPEAKER",
        "SHOW_IMAGE",
        "SHOW_KEYED_IMAGE",
        "SHOW_TEXT",
    ]

    /**
     * Pushes a scene onto the event stream and begins rendering it.
     *
     * @param {string} scene The string identifier for the scene
     */
    async push_scene(scene: string, skip_delays?: boolean) {
        console.log(`Pushing Scene: ${scene}`)
        this.push_event("scene", scene)

        if (skip_delays) {
            await this.run_scene(scene, true)
        } else {
            setTimeout(async () => { await this.run_scene(scene) }, this.SECONDS_BETWEEN_SCENES * 1000)
        }
    }

    /**
     * Renders a scene and processes its conclusion.
     *
     * @param {string} scene The string identifier for the scene
     */
    async run_scene(scene: string, skip_delays?: boolean) {
        const scene_object = dialog_data.dialog[scene]

        // Check if we need to skip this scene.
        if (dialog_data.dialog[scene].skip_to_if) {
            for (const key in scene_object.skip_to_if) {
                if (this.has_inventory_item(key, scene_object.skip_to_if[key].minimum_quantity)) {
                    // We have the item. Consume it (if necessary) and go to the next scene.
                    const skip_directions = scene_object.skip_to_if[key]
                    if (skip_directions.consumes_item) {
                        this.remove_inventory_item(key, 1)
                    }

                    return await this.run_scene(skip_directions.target, skip_delays)
                }
            }
        }

        console.log(`Running Scene: ${scene}`)
        await this.render_lines(scene_object.dialog, skip_delays)
        await this.end_scene(scene, skip_delays)
    }

    /**
     * Pushes our lines at a paced pattern into the feed.
     *
     * @param {string[]} lines An array of lines to render
     */
    async render_lines(lines: string[], skip_delays?: boolean) {
        for (const line of lines) {
            console.log(`Pushing Line: ${line}`)
            const item = this.parse_feed_item(line)

            // If we're flashing an item, convert it to an appropriate image flash.
            if (item.command === "FLASH_ITEM") {
                item.command = "FLASH_IMAGE"
                item.argument = dialog_data.items[item.argument].avatar
            }

            // If we're using a keyed image, convert it to an appropriate image show.
            if (item.command === "SHOW_KEYED_IMAGE") {
                item.command = "SHOW_IMAGE"
                item.argument = dialog_data.keyed_images[item.argument]
            }

            // If our item is an asset that must be loaded remotely, do so.
            if (item.command === "SHOW_IMAGE" || item.command === "FLASH_IMAGE") {
                const base64 = await this.load_image_to_base64(item.argument)
                item.argument = base64
            }

            this.feed.push(item)
            if (item.command === "DELAY" && !skip_delays) {
                // Wait our given number of seconds.
                await this.delay(parseFloat(item.argument) * 1000)
            } else if (item.command === "ADD_ITEM") {
                // Add our item to inventory.
                this.add_inventory_item(item.argument, 1)
                console.log("Current Inventory", this.inventory)
            } else if (item.command !== "SET_SPEAKER" && item.command !== "ADD_ITEM" && !skip_delays) {
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

    /**
     * Removes the given item from our inventory, decrementing quantities.
     *
     * @param {string} identifier The item we want to remove
     * @param {number} quantity   The quantity we want to remove
     */
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
     * @param {string} identifier       The item we're seeking.
     * @param {number} minimum_quantity The minimum quantity we need
     */
    has_inventory_item(identifier: string, minimum_quantity = 1) {
        for (const item of this.inventory) {
            if (item.identifier === identifier && item.quantity >= minimum_quantity) {
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
            const img = new Image()
            img.crossOrigin = "Anonymous"
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
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
    async end_scene(scene: string, skip_delays?: boolean) {
        const scene_object = dialog_data.dialog[scene]
        if (!scene_object.next || Object.keys(scene_object.next).length === 0) {
            // TODO - We have nowhere to go! We've reached the end of the game.
            console.log("\n\n!!! WE HAVE REACHED A DEAD END !!!\n\n")
            return
        }

        else if (Object.keys(scene_object.next).length === 1) {
            // There is only one option, automatically progress towards it.
            const new_scene = Object.keys(scene_object.next)[0]
            await this.render_lines(scene_object.next[new_scene].dialog, skip_delays)
            return await this.run_scene(new_scene, skip_delays)
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
    async select_option(option: DialogOption, skip_delays?: boolean) {
        this.options = []
        this.push_event("option", option.scene)
        await this.render_lines(option.dialog, skip_delays)
        await this.run_scene(option.scene, skip_delays)
        return
    }

    /**
     * Pushes a player action to the event stream and saves the stream.
     *
     * @param {string} kind       The kind of event performed
     * @param {string} identifier A unique identifier to recreate this event
     */
    async push_event(kind: string, identifier: string) {
        this.stream.push(new DialogStreamEvent(kind, identifier))
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

            if (!this.WHITELISTED_COMMANDS.includes(command)) {
                argument = `[[${command}]]${argument}`
                command = "SHOW_TEXT"
            }

            if (command === "SET_SPEAKER") {
                const character = dialog_data.characters[argument]
                this.last_speaker = new DialogSpeaker(argument)

                let speaker_encountered = false
                for (const index in this.characters) {
                    if (this.characters[index].identifier === argument) {
                        speaker_encountered = true
                    }
                }

                if (!speaker_encountered) {
                    this.characters.push(JSON.parse(JSON.stringify(this.last_speaker)))
                }
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
    public hidden: boolean = null

    constructor(identifier) {
        this.identifier = identifier

        const character_object = dialog_data.characters[this.identifier]
        this.name = character_object ? character_object.name || "NO_NAME" : "UNDEFINED"
        this.hidden = character_object ? character_object.hidden : false
        this.avatar = character_object ? character_object.avatar || "NO_IMAGE" : "UNDEFINED"
    }
}

export class InventoryItem {
    public identifier: string = null
    public quantity: number = null
    public name: string = null
    public hidden: boolean = null
    public avatar: string = null
    public is_status: boolean = null
    public always_show_chip: boolean = null

    constructor(identifier, quantity=1) {
        this.identifier = identifier
        this.quantity = quantity

        const item_object = dialog_data.items[this.identifier]
        this.name = item_object ? item_object.name || "NO_NAME" : "UNDEFINED"
        this.hidden = item_object ? item_object.hidden : false
        this.avatar = item_object ? item_object.avatar || "NO_IMAGE" : "UNDEFINED"
        this.is_status = item_object ? item_object.is_status : false
        this.always_show_chip = item_object ? item_object.always_show_chip : false
    }
}

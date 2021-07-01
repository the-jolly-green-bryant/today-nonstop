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
    public feed: string[] = []

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
        console.log(`Running Scene: ${scene}`)
        await this.render_lines(dialog_data.dialog[scene].dialog)
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
            this.feed.push(line)
            await this.delay(this.SECONDS_BETWEEN_DIALOG_LINES * 1000)
        }
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
        }

        else if (Object.keys(scene_object.next).length === 1) {
            // There is only one option, automatically progress towards it.
            const new_scene = Object.keys(scene_object.next)[0]
            await this.render_lines(scene_object.next[new_scene].dialog)
            return this.run_scene(new_scene)
        }

        else {
            // TODO - Present options for selection
            console.log("TODO - Present Options")
        }
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
    kind: string = null
    identifier: string = null

    constructor(kind, identifier) {
        this.kind = kind
        this.identifier = identifier
    }
}

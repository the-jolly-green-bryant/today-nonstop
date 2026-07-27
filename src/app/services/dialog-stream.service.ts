import { Injectable } from "@angular/core"
import { DialogStream, DialogOption } from "../classes/dialog-stream"
import { StorageService } from "./storage.service"

@Injectable({
  providedIn: "root",
})
export class DialogStreamService {
  public dialog_stream: DialogStream = null
  public initialized = false

  constructor(private storage: StorageService) {
    this.dialog_stream = new DialogStream()
  }

  /**
   * Either loads events from storage or runs our default scene if no events found.
   *
   * @param {string} default_scene The identifier for our default scene
   */
  public async load_events(
    default_scene: string,
    force_reinitialization = false,
  ) {
    // If we're already initialized, this is good.
    if (this.initialized && !force_reinitialization) {
      return
    }

    this.dialog_stream = new DialogStream()
    // await this.storage.clear()  // Uncomment to clear storage.
    const dialog_events = await this.storage.get(
      this.storage.event_stream_db_key,
    )

    // If we don't have dialog events, push our default scene
    if (!dialog_events) {
      await this.dialog_stream.push_scene(default_scene)
    }

    // Otherwise, load our dialog event stream and simulate each event.
    else {
      for (const i in dialog_events) {
        if (Object.prototype.hasOwnProperty.call(dialog_events, i)) {
          const event_object = dialog_events[i]

          if (event_object.kind === "scene") {
            await this.dialog_stream.push_scene(event_object.identifier, true)
          }

          if (event_object.kind === "option") {
            for (const k in this.dialog_stream.options) {
              if (
                Object.prototype.hasOwnProperty.call(
                  this.dialog_stream.options,
                  k,
                )
              ) {
                const option = this.dialog_stream.options[k]
                if (option.scene !== event_object.identifier) {
                  continue
                }

                await this.dialog_stream.select_option(option, true)
                break
              }
            }
          }
        }
      }
    }

    this.initialized = true
  }

  /**
   * Select an option and then push the stream to storage.
   *
   * @param {DialogOption} option The option we're selecting
   */
  async select_option(option: DialogOption) {
    await this.dialog_stream.select_option(option)
    await this.storage.set(
      this.storage.event_stream_db_key,
      this.dialog_stream.stream,
    )
  }
}

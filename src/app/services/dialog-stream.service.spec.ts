import { DialogStreamEvent } from "../classes/dialog-stream"
import { DialogStreamService } from "./dialog-stream.service"

describe("DialogStreamService", () => {
  let values: Map<string, unknown>
  let service: DialogStreamService

  beforeEach(() => {
    jasmine.clock().install()
    values = new Map<string, unknown>()
    const storage = {
      event_stream_db_key: "events",
      preferences_db_key: "preferences",
      story_summary_db_key: "summary",
      get: async <T>(key: string) => (values.get(key) as T) ?? null,
      set: async <T>(key: string, value: T) => {
        values.set(key, value)
      },
      remove: async (key: string) => {
        values.delete(key)
      },
    }
    const analytics = {
      initialize: () => undefined,
      trackChoice: () => undefined,
      trackScene: () => undefined,
      trackSession: () => undefined,
    }
    service = new DialogStreamService(storage as never, analytics as never)
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it("erases persistent memories and immediately persists a clean opening", async () => {
    service.dialog_stream.add_inventory_item("amy_trust", 1)
    service.dialog_stream.add_inventory_item("read_black_ledger", 1)
    values.set("events", [
      new DialogStreamEvent("scene", "1300__BELL_HEIST"),
      new DialogStreamEvent("option", "1360__BELL_HEIST"),
    ])

    await service.start_new_game()

    expect(service.dialog_stream.has_inventory_item("amy_trust")).toBeFalse()
    expect(
      service.dialog_stream.has_inventory_item("read_black_ledger"),
    ).toBeFalse()
    expect(values.get("events")).toEqual([
      new DialogStreamEvent("scene", "1010__START"),
    ])
    expect(values.get("summary")).toEqual({
      choices_made: 0,
      last_scene: "1010__START",
      loop_number: 1,
    })
  })
})

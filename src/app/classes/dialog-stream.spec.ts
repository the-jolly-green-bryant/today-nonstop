import { DialogStream } from "./dialog-stream"

describe("DialogStream", () => {
  let stream: DialogStream

  beforeEach(() => {
    stream = new DialogStream()
  })

  it("renders plain text as a text command", () => {
    const item = stream.parse_feed_item("Hello, traveler.")

    expect(item.command).toBe("SHOW_TEXT")
    expect(item.argument).toBe("Hello, traveler.")
    expect(item.raw).toBe("Hello, traveler.")
  })

  it("falls back to text for unknown commands", () => {
    const item = stream.parse_feed_item("[[NOT_A_COMMAND]]Still readable")

    expect(item.command).toBe("SHOW_TEXT")
    expect(item.argument).toBe("[[NOT_A_COMMAND]]Still readable")
  })

  it("tracks a speaker only once", () => {
    stream.parse_feed_item("[[SET_SPEAKER]]player")
    stream.parse_feed_item("[[SET_SPEAKER]]player")

    expect(stream.last_speaker.identifier).toBe("player")
    expect(stream.characters.length).toBe(1)
  })

  it("increments and removes inventory quantities", () => {
    stream.add_inventory_item("debug_bread", 2)
    stream.add_inventory_item("debug_bread", 1)
    stream.remove_inventory_item("debug_bread", 2)

    expect(stream.has_inventory_item("debug_bread")).toBeTrue()
    expect(stream.inventory[0].quantity).toBe(1)
  })

  it("preserves persistent items during a normal inventory reset", () => {
    stream.add_inventory_item("debug_bread", 1)
    stream.add_inventory_item("moldy_bread", 1)

    stream.clear_inventory()

    expect(stream.has_inventory_item("debug_bread")).toBeFalse()
    expect(stream.has_inventory_item("moldy_bread")).toBeTrue()
  })

  it("unlocks the bell heist only after all three allies and clues are secured", async () => {
    await stream.end_scene("1011__START", true)
    expect(
      stream.options.some((option) => option.scene === "1300__BELL_HEIST"),
    ).toBeFalse()

    stream.options = []
    stream.add_inventory_item("amy_trust", 1)
    stream.add_inventory_item("shady_truce", 1)
    stream.add_inventory_item("read_black_ledger", 1)
    await stream.end_scene("1011__START", true)

    expect(
      stream.options.some((option) => option.scene === "1300__BELL_HEIST"),
    ).toBeTrue()
  })
})

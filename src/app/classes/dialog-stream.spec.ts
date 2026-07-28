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

  it("waits at a breathing choice without creating a story branch", async () => {
    stream.speed_multiplier = 0
    const rendering = stream.render_lines([
      "Before the pause.",
      "[[PAUSE]]Look outside",
      "After the pause.",
    ])
    await Promise.resolve()

    expect(stream.waiting_for_continue).toBeTrue()
    expect(stream.feed.map((item) => item.argument)).toEqual([
      "Before the pause.",
      "Look outside",
    ])
    expect(stream.stream).toEqual([])

    stream.continue_story()
    await rendering

    expect(stream.waiting_for_continue).toBeFalse()
    expect(stream.feed.map((item) => item.argument)).toEqual([
      "Before the pause.",
      "Look outside",
      "After the pause.",
    ])
    expect(stream.stream).toEqual([])
  })

  it("does not block saved-story replay at a breathing choice", async () => {
    await stream.render_lines(
      ["Before.", "[[PAUSE]]Keep listening", "After."],
      true,
    )

    expect(stream.waiting_for_continue).toBeFalse()
    expect(stream.feed.map((item) => item.command)).toEqual([
      "SHOW_TEXT",
      "DELAY",
      "SHOW_TEXT",
    ])
  })

  it("automatically breaks up long sequential dialogue", async () => {
    stream.speed_multiplier = 0
    const lines = Array.from(
      { length: stream.MAX_SEQUENTIAL_BEATS + 1 },
      (_, index) => `Beat ${index + 1}`,
    )
    const rendering = stream.render_lines(lines)
    for (
      let attempts = 0;
      attempts < stream.MAX_SEQUENTIAL_BEATS + 2 &&
      !stream.waiting_for_continue;
      attempts++
    ) {
      await Promise.resolve()
    }

    expect(stream.waiting_for_continue).toBeTrue()
    expect(stream.feed.length).toBe(stream.MAX_SEQUENTIAL_BEATS + 1)
    expect(stream.feed[stream.feed.length - 1].command).toBe("PAUSE")
    expect(stream.feed[stream.feed.length - 1].argument).toBe(
      "Continue the story",
    )

    stream.continue_story()
    await rendering

    expect(stream.feed[stream.feed.length - 1].argument).toBe(
      `Beat ${stream.MAX_SEQUENTIAL_BEATS + 1}`,
    )
    expect(stream.stream).toEqual([])
  })

  it("does not inject automatic pauses while replaying a save", async () => {
    const lines = Array.from(
      { length: stream.MAX_SEQUENTIAL_BEATS + 2 },
      (_, index) => `Remembered beat ${index + 1}`,
    )

    await stream.render_lines(lines, true)

    expect(stream.waiting_for_continue).toBeFalse()
    expect(stream.feed.every((item) => item.command === "SHOW_TEXT")).toBeTrue()
  })
})

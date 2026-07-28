import dialogData from "./dialog.json"

describe("story data", () => {
  it("only links to scenes that exist", () => {
    const scenes = dialogData.dialog as Record<
      string,
      {
        next?: Record<string, unknown>
        skip_to_if?: Record<string, { target: string }>
      }
    >

    for (const [sceneId, scene] of Object.entries(scenes)) {
      for (const target of Object.keys(scene.next ?? {})) {
        expect(scenes[target])
          .withContext(`${sceneId} links to missing scene ${target}`)
          .toBeDefined()
      }

      for (const condition of Object.values(scene.skip_to_if ?? {})) {
        expect(scenes[condition.target])
          .withContext(`${sceneId} skips to missing scene ${condition.target}`)
          .toBeDefined()
      }
    }
  })

  it("references known characters, items, and keyed images", () => {
    const commands = Object.entries(dialogData.dialog).flatMap(
      ([sceneId, scene]) =>
        [
          ...(scene.dialog ?? []),
          ...Object.values(
            (scene.next ?? {}) as Record<string, { dialog?: string[] }>,
          ).flatMap((option) => option.dialog ?? []),
        ].map((line) => ({ line, sceneId })),
    )

    for (const { line, sceneId } of commands) {
      const match = line.match(
        /^\[\[(SET_SPEAKER|ADD_ITEM|FLASH_ITEM|SHOW_KEYED_IMAGE|FLASH_KEYED_IMAGE)\]\](.+)$/,
      )
      if (!match) {
        continue
      }

      const [, command, identifier] = match
      const collection =
        command === "SET_SPEAKER"
          ? dialogData.characters
          : command === "SHOW_KEYED_IMAGE" || command === "FLASH_KEYED_IMAGE"
            ? dialogData.keyed_images
            : dialogData.items

      expect(collection[identifier])
        .withContext(
          `${sceneId} uses unknown ${command} identifier ${identifier}`,
        )
        .toBeDefined()
    }
  })

  it("uses known inventory flags for conditions and character discoveries", () => {
    const scenes = dialogData.dialog as Record<
      string,
      {
        skip_to_if?: Record<string, unknown>
        next?: Record<string, { show_if?: string[] }>
      }
    >
    const characters = dialogData.characters as Record<
      string,
      { discoverables?: Record<string, unknown> }
    >

    for (const [sceneId, scene] of Object.entries(scenes)) {
      for (const flag of Object.keys(scene.skip_to_if ?? {})) {
        expect(dialogData.items[flag])
          .withContext(`${sceneId} skips on unknown inventory flag ${flag}`)
          .toBeDefined()
      }

      for (const [target, option] of Object.entries(scene.next ?? {})) {
        for (const flag of option.show_if ?? []) {
          expect(dialogData.items[flag])
            .withContext(
              `${sceneId} option to ${target} uses unknown inventory flag ${flag}`,
            )
            .toBeDefined()
        }
      }
    }

    for (const [characterId, character] of Object.entries(characters)) {
      for (const flag of Object.keys(character.discoverables ?? {})) {
        expect(dialogData.items[flag])
          .withContext(
            `${characterId} discovery uses unknown inventory flag ${flag}`,
          )
          .toBeDefined()
      }
    }
  })

  it("contains the complete Thirteenth Bell campaign", () => {
    const scenes = dialogData.dialog
    const campaignScenes = Object.keys(scenes).filter((sceneId) =>
      /^(12|13)\d\d__/.test(sceneId),
    )
    const campaignLines = campaignScenes.flatMap(
      (sceneId) => scenes[sceneId].dialog ?? [],
    )

    expect(campaignScenes.length).toBeGreaterThanOrEqual(25)
    expect(campaignLines.length).toBeGreaterThanOrEqual(800)
    expect(scenes["1300__BELL_HEIST"]).toBeDefined()
    expect(scenes["1370__BELL_HEIST"]).toBeDefined()
    expect(dialogData.items.unmade_tomorrow.persists).toBeTrue()
  })

  it("gives every opening route a substantial narrative investigation", () => {
    const openingRoutes = [
      "1020__FAKE_WORLD",
      "1030__TOURNEY",
      "1040__INVESTIGATE",
      "1050__CHICKEN",
    ]

    for (const sceneId of openingRoutes) {
      expect(dialogData.dialog[sceneId].dialog.length)
        .withContext(`${sceneId} should establish its investigation`)
        .toBeGreaterThanOrEqual(10)
    }

    const openingCampaign = Object.entries(dialogData.dialog)
      .filter(([sceneId]) => /^(10|11)\d\d__/.test(sceneId))
      .flatMap(([, scene]) => scene.dialog ?? [])
      .join(" ")

    expect(openingCampaign).toContain("The bell preserves it.")
    expect(openingCampaign).toContain("Everyone you left at sunset.")
    expect(openingCampaign).toContain("tomorrow's date")
    expect(openingCampaign).not.toContain("wrong fandom")
    expect(openingCampaign).not.toContain("PowerPoint")
    expect(openingCampaign).not.toContain("Groundhog Day")
  })

  it("contains a complete ending rather than a placeholder", () => {
    expect(dialogData.dialog["2005__EPILOGUE"]).toBeDefined()
    expect(dialogData.items.escaped_loop).toBeDefined()
    expect(dialogData.dialog["2005__EPILOGUE"].dialog.join(" ")).toContain(
      "THE END",
    )
  })

  it("treats the memory bridge as a clue path, not an unearned ending", () => {
    const bridgeLines = dialogData.dialog["1140__FAKE_WORLD"].dialog.join(" ")

    expect(bridgeLines).toContain("I remember you.")
    expect(bridgeLines.toLowerCase()).not.toContain("blink")
    expect(
      dialogData.dialog["1171__ENDGAME"].next["1000__RESTART"],
    ).toBeDefined()
    expect(
      dialogData.dialog["1171__ENDGAME"].next["2000__START"],
    ).toBeUndefined()
  })

  it("compresses familiar setup when the player revisits a route", () => {
    const revisitRoutes = [
      ["1020__FAKE_WORLD", "1020R__REVISIT", "visited_road"],
      ["1030__TOURNEY", "1030R__REVISIT", "visited_tourney"],
      ["1040__INVESTIGATE", "1040R__REVISIT", "visited_child"],
      ["1050__CHICKEN", "1050R__REVISIT", "visited_farm"],
      ["1200__MARKET", "1200R__REVISIT", "visited_market"],
      ["1300__BELL_HEIST", "1300R__REVISIT", "attempted_bell_heist"],
    ] as const

    for (const [firstVisit, revisit, flag] of revisitRoutes) {
      expect(dialogData.dialog[firstVisit].dialog).toContain(
        `[[ADD_ITEM]]${flag}`,
      )
      expect(dialogData.dialog[firstVisit].skip_to_if[flag].target).toBe(
        revisit,
      )
      expect(dialogData.dialog[revisit].dialog.length)
        .withContext(`${revisit} should be shorter than ${firstVisit}`)
        .toBeLessThan(dialogData.dialog[firstVisit].dialog.length)
      expect(dialogData.items[flag].persists).toBeTrue()
      expect(dialogData.items[flag].hidden).toBeTrue()
    }

    expect(dialogData.dialog["1013__START"].dialog.length).toBeLessThanOrEqual(
      10,
    )
    expect(
      dialogData.dialog["1300R__REVISIT"].skip_to_if.reached_bell_chamber
        .target,
    ).toBe("1364__BELL_CHAMBER_REVISIT")
  })

  it("does not grant late-game memories during a clean opening", () => {
    const openingScenes = ["1010__START", "1011__START"]
    const openingCommands = openingScenes.flatMap(
      (sceneId) => dialogData.dialog[sceneId].dialog ?? [],
    )
    const grantedItems = openingCommands
      .filter((line) => line.startsWith("[[ADD_ITEM]]"))
      .map((line) => line.replace("[[ADD_ITEM]]", ""))

    expect(grantedItems).toEqual(["lives_lived"])
    expect(grantedItems).not.toContain("amy_trust")
    expect(grantedItems).not.toContain("shady_truce")
    expect(grantedItems).not.toContain("read_black_ledger")
    expect(grantedItems).not.toContain("knows_bell_ritual")
    expect(grantedItems).not.toContain("escaped_loop")
  })
})

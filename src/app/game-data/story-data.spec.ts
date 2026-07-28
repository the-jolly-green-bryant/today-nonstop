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

  it("grounds every first-morning choice in information Jon actually has", () => {
    const openingChoices = dialogData.dialog["1011__START"].next
    const renderedOpening = [
      ...dialogData.dialog["1010__START"].dialog,
      ...Object.values(openingChoices).flatMap((choice) => [
        choice.title ?? "",
        ...(choice.dialog ?? []),
      ]),
    ].join(" ")

    expect(Object.values(openingChoices).map((choice) => choice.title)).toEqual(
      [
        "Take the long road into town.",
        "Get ready for the tournament.",
        "Light the hearth and make breakfast.",
        "Start the farm chores.",
        "Head into town for the fair.",
        "I know what today is. Gather the others.",
      ],
    )

    const unearnedClaims = [
      "rain is wrong",
      "rain behaves incorrectly",
      "tournament keeps appearing in my memories",
      "tournament and its records",
      "listen for the cry",
      "Ma said not to forget the eggs",
      "egg Ma warned you about",
      "impossible bell",
    ]

    for (const claim of unearnedClaims) {
      expect(renderedOpening.toLowerCase())
        .withContext(`clean opening should not claim: ${claim}`)
        .not.toContain(claim.toLowerCase())
    }

    expect(openingChoices["1300__BELL_HEIST"].show_if).toEqual([
      "amy_trust",
      "shady_truce",
      "read_black_ledger",
    ])
  })

  it("does not mention the black ledger before a route reveals it", () => {
    const unbriefedTowerVisit =
      dialogData.dialog["1230__MARKET_TOWER"].dialog.join(" ")

    expect(unbriefedTowerVisit.toLowerCase()).not.toContain("ledger")
    expect(unbriefedTowerVisit).toContain("What are you keeping in there?")
  })

  it("uses non-branching breathing choices at major reveals", () => {
    const pauseCommands = Object.values(dialogData.dialog).flatMap((scene) => [
      ...(scene.dialog ?? []),
      ...Object.values(
        (scene.next ?? {}) as Record<string, { dialog?: string[] }>,
      ).flatMap((option) => option.dialog ?? []),
    ])

    expect(
      pauseCommands.filter((line) => line.startsWith("[[PAUSE]]")).length,
    ).toBeGreaterThanOrEqual(7)
    expect(dialogData.dialog["1010__START"].dialog).toContain(
      "[[PAUSE]]Listen to the rain",
    )
    expect(dialogData.dialog["1241__LEDGER"].dialog).toContain(
      "[[PAUSE]]Turn the final page",
    )
    expect(dialogData.dialog["1360__BELL_HEIST"].dialog).toContain(
      "[[PAUSE]]Face what the bell kept",
    )
  })

  it("reveals corrections before revealing the Redactor's identity", () => {
    const firstCorrection =
      dialogData.dialog["1110__EASTER_EGG_ENDING"].dialog.join(" ")
    const identityReveal =
      dialogData.dialog["1160__FOURTH_WALL"].dialog.join(" ")
    const uninitiatedRevisit =
      dialogData.dialog["1020R__REVISIT"].dialog.join(" ")

    expect(firstCorrection).toContain("CORRECTION IN PROGRESS.")
    expect(firstCorrection).not.toContain("Redactor")
    expect(firstCorrection).toContain("[[SET_SPEAKER]]margin_voice")
    expect(firstCorrection).not.toContain("Ask about the bell.")
    expect(firstCorrection).not.toContain("Does the bell approve it?")
    expect(firstCorrection).toContain(
      "What decides which beginning is approved?",
    )
    expect(identityReveal).toContain("I am the Redactor.")
    expect(uninitiatedRevisit.toLowerCase()).not.toContain("correction")
    expect(
      dialogData.dialog["1020R__REVISIT"].next[
        "1110__EASTER_EGG_ENDING"
      ].title.toLowerCase(),
    ).not.toContain("correction")
    expect(
      dialogData.dialog["1020R__REVISIT"].skip_to_if.system_reboots.target,
    ).toBe("1020C__REVISIT")
    expect(
      dialogData.dialog["1000__RESTART"].next["1160__FOURTH_WALL"].show_if,
    ).toEqual(["system_reboots"])
    expect(
      dialogData.dialog["1000__RESTART"].next["1160__FOURTH_WALL"].title,
    ).toBe("Call out to the red writing.")
    expect(
      dialogData.dialog["1000__RESTART"].next["1160__FOURTH_WALL"].dialog.join(
        " ",
      ),
    ).not.toContain("built")
  })

  it("keeps revisit summaries neutral when routes contain optional discoveries", () => {
    const neutralRevisits = {
      "1030R__REVISIT": ["ledger", "records"],
      "1050R__REVISIT": ["crowned", "ledger-marked", "your majesty"],
      "1200R__REVISIT": [
        "amy remembers",
        "shady dreams",
        "harold keeps the book",
      ],
    }

    for (const [sceneId, forbiddenClaims] of Object.entries(neutralRevisits)) {
      const scene = dialogData.dialog[sceneId]
      const rendered = [
        ...(scene.dialog ?? []),
        ...Object.values(
          (scene.next ?? {}) as Record<string, { title?: string }>,
        ).map((option) => option.title ?? ""),
      ]
        .join(" ")
        .toLowerCase()

      for (const claim of forbiddenClaims) {
        expect(rendered)
          .withContext(`${sceneId} should not assume: ${claim}`)
          .not.toContain(claim)
      }
    }
  })

  it("does not name a reset before Jon experiences his first return", () => {
    const firstLifeRoutes = [
      "1010__START",
      "1020__FAKE_WORLD",
      "1030__TOURNEY",
      "1040__INVESTIGATE",
      "1050__CHICKEN",
      "1051__CHICKEN",
      "1052__CHICKEN",
      "1053__CHICKEN",
      "1054__CHICKEN",
      "1055__CHICKEN",
      "1056__CHICKEN",
      "1200__MARKET",
    ]
    const firstLifeDialogue = firstLifeRoutes
      .flatMap((sceneId) => dialogData.dialog[sceneId].dialog ?? [])
      .join(" ")
      .toLowerCase()

    expect(firstLifeDialogue).not.toContain("part of the reset")
    expect(firstLifeDialogue).not.toContain("the loop")
  })

  it("limits named mystery mechanics to scenes that reveal or remember them", () => {
    const scenesUsing = (term: string) =>
      Object.entries(dialogData.dialog)
        .filter(([, scene]) => {
          const text = [
            ...(scene.dialog ?? []),
            ...Object.values(
              (scene.next ?? {}) as Record<
                string,
                { title?: string; dialog?: string[] }
              >,
            ).flatMap((option) => [
              option.title ?? "",
              ...(option.dialog ?? []),
            ]),
          ].join(" ")
          return text.toLowerCase().includes(term.toLowerCase())
        })
        .map(([sceneId]) => sceneId)

    expect(scenesUsing("Redactor")).toEqual(["1160__FOURTH_WALL"])
    expect(scenesUsing("correction")).toEqual([
      "1110__EASTER_EGG_ENDING",
      "1020C__REVISIT",
    ])
  })

  it("keeps every modern story branch reachable from a clean opening", () => {
    const scenes = dialogData.dialog
    const reachable = new Set<string>()
    const pending = [dialogData.default_scene]

    while (pending.length) {
      const sceneId = pending.shift()
      if (!sceneId || reachable.has(sceneId)) continue

      reachable.add(sceneId)
      const scene = scenes[sceneId]
      pending.push(...Object.keys(scene.next ?? {}))
      pending.push(
        ...Object.values(
          (scene.skip_to_if ?? {}) as Record<string, { target: string }>,
        ).map((condition) => condition.target),
      )
    }

    const modernScenes = Object.keys(scenes).filter(
      (sceneId) =>
        !/^(010[ab]|020a|030a|040a|041a|050[ab]|060__)/.test(sceneId),
    )

    for (const sceneId of modernScenes) {
      expect(reachable.has(sceneId))
        .withContext(`${sceneId} cannot be reached from a clean opening`)
        .toBeTrue()
    }
  })
})

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

  it("contains a complete ending rather than a placeholder", () => {
    expect(dialogData.dialog["2005__EPILOGUE"]).toBeDefined()
    expect(dialogData.items.escaped_loop).toBeDefined()
    expect(dialogData.dialog["2005__EPILOGUE"].dialog.join(" ")).toContain(
      "THE END",
    )
  })
})

import { getStoryMilestone, STORY_MILESTONES } from "./story-analytics"

describe("story analytics", () => {
  it("defines an ordered progression from the opening to completion", () => {
    expect(getStoryMilestone("1010__START")?.progressPercent).toBe(0)
    expect(getStoryMilestone("1300__BELL_HEIST")?.progressPercent).toBe(70)
    expect(getStoryMilestone("2005__EPILOGUE")?.progressPercent).toBe(100)
  })

  it("uses valid GA4-friendly milestone metadata", () => {
    for (const [sceneId, milestone] of Object.entries(STORY_MILESTONES)) {
      expect(sceneId).toMatch(/^\d{4}[A-Z]?__/)
      expect(milestone.chapter).toMatch(/^[a-z0-9_]+$/)
      expect(milestone.milestone).toMatch(/^[a-z0-9_]+$/)
      expect(milestone.progressPercent).toBeGreaterThanOrEqual(0)
      expect(milestone.progressPercent).toBeLessThanOrEqual(100)
    }
  })

  it("does not track ordinary connective scenes as milestones", () => {
    expect(getStoryMilestone("1011__START")).toBeNull()
  })
})

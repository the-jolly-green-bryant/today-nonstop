export interface StoryMilestone {
  chapter: string
  milestone: string
  progressPercent: number
}

export const STORY_MILESTONES: Record<string, StoryMilestone> = {
  "1010__START": {
    chapter: "awakening",
    milestone: "story_started",
    progressPercent: 0,
  },
  "1000__RESTART": {
    chapter: "loop",
    milestone: "loop_restarted",
    progressPercent: 10,
  },
  "1020__FAKE_WORLD": {
    chapter: "investigation",
    milestone: "impossible_road",
    progressPercent: 15,
  },
  "1030__TOURNEY": {
    chapter: "investigation",
    milestone: "tournament",
    progressPercent: 15,
  },
  "1040__INVESTIGATE": {
    chapter: "investigation",
    milestone: "repeating_cry",
    progressPercent: 15,
  },
  "1050__CHICKEN": {
    chapter: "investigation",
    milestone: "farm_mystery",
    progressPercent: 15,
  },
  "1140__FAKE_WORLD": {
    chapter: "memory_bridge",
    milestone: "met_the_echo",
    progressPercent: 35,
  },
  "1200__MARKET": {
    chapter: "market",
    milestone: "reached_the_fair",
    progressPercent: 40,
  },
  "1213__MARKET_CRIER": {
    chapter: "market",
    milestone: "earned_amy_trust",
    progressPercent: 50,
  },
  "1222__MARKET_SHADY": {
    chapter: "market",
    milestone: "earned_shady_truce",
    progressPercent: 55,
  },
  "1241__LEDGER": {
    chapter: "market",
    milestone: "read_black_ledger",
    progressPercent: 65,
  },
  "1300__BELL_HEIST": {
    chapter: "bell_heist",
    milestone: "heist_unlocked",
    progressPercent: 70,
  },
  "1330__BELL_HEIST": {
    chapter: "bell_heist",
    milestone: "confronted_harold",
    progressPercent: 78,
  },
  "1350__BELL_HEIST": {
    chapter: "bell_heist",
    milestone: "entered_bell_tower",
    progressPercent: 85,
  },
  "1360__BELL_HEIST": {
    chapter: "bell_heist",
    milestone: "reached_bell_chamber",
    progressPercent: 90,
  },
  "1370__BELL_HEIST": {
    chapter: "tomorrow",
    milestone: "opened_tomorrow",
    progressPercent: 95,
  },
  "2005__EPILOGUE": {
    chapter: "epilogue",
    milestone: "story_completed",
    progressPercent: 100,
  },
}

export function getStoryMilestone(sceneId: string): StoryMilestone | null {
  return STORY_MILESTONES[sceneId] ?? null
}

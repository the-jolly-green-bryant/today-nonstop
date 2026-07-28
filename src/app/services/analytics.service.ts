import { DOCUMENT } from "@angular/common"
import { Inject, Injectable } from "@angular/core"
import { getStoryMilestone } from "./story-analytics"

interface RuntimeConfig {
  googleAnalyticsMeasurementId?: string
}

interface AnalyticsWindow extends Window {
  __TODAY_NONSTOP_CONFIG__?: RuntimeConfig
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  private initialized = false
  private measurementId = ""
  private sessionMilestones = new Set<string>()

  constructor(@Inject(DOCUMENT) private document: Document) {}

  initialize(): void {
    if (this.initialized) {
      return
    }

    this.initialized = true
    const analyticsWindow = this.document.defaultView as AnalyticsWindow | null
    this.measurementId =
      analyticsWindow?.__TODAY_NONSTOP_CONFIG__?.googleAnalyticsMeasurementId ??
      ""

    if (!analyticsWindow || !/^G-[A-Z0-9]+$/.test(this.measurementId)) {
      return
    }

    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer.push(args)
    }

    analyticsWindow.gtag("consent", "default", {
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: "denied",
    })
    analyticsWindow.gtag("js", new Date())
    analyticsWindow.gtag("config", this.measurementId, {
      anonymize_ip: true,
      send_page_view: true,
    })

    const script = this.document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      this.measurementId,
    )}`
    this.document.head.appendChild(script)
  }

  trackSession(kind: "new_story" | "resume_story", savedEvents = 0): void {
    this.track("story_session", {
      session_kind: kind,
      saved_event_count: savedEvents,
    })
  }

  trackChoice(sceneId: string, choiceText: string, loopNumber: number): void {
    this.track("story_choice", {
      choice_target: sceneId,
      choice_text: choiceText.slice(0, 100),
      loop_number: loopNumber,
    })
  }

  trackScene(sceneId: string, loopNumber: number): void {
    const milestone = getStoryMilestone(sceneId)
    if (!milestone) {
      return
    }

    const dedupeKey = `${sceneId}:${loopNumber}`
    if (this.sessionMilestones.has(dedupeKey)) {
      return
    }
    this.sessionMilestones.add(dedupeKey)

    this.track("story_progress", {
      chapter: milestone.chapter,
      milestone: milestone.milestone,
      progress_percent: milestone.progressPercent,
      scene_id: sceneId,
      loop_number: loopNumber,
    })
  }

  private track(eventName: string, parameters: Record<string, unknown>): void {
    this.initialize()
    const analyticsWindow = this.document.defaultView as AnalyticsWindow | null
    analyticsWindow?.gtag?.("event", eventName, parameters)
  }
}

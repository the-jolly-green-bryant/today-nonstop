import { Component, OnInit, Input } from "@angular/core"
import { DialogStream } from "../../classes/dialog-stream"

@Component({
  standalone: false,
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  @Input() stream: DialogStream = null
  active_section: "clues" | "relics" | "lives" = "clues"

  constructor() {}

  ngOnInit() {}

  get section_items() {
    const visible = (this.stream?.inventory ?? []).filter(
      (item) => !item.hidden && item.quantity > 0,
    )
    if (this.active_section === "relics") {
      return visible.filter((item) => !item.is_status)
    }
    if (this.active_section === "lives") {
      const lifeIds = new Set([
        "lives_lived",
        "finished_once",
        "system_reboots",
        "escaped_loop",
        "unmade_tomorrow",
      ])
      return visible.filter((item) => lifeIds.has(item.identifier))
    }
    return visible.filter(
      (item) =>
        item.is_status &&
        ![
          "lives_lived",
          "finished_once",
          "system_reboots",
          "escaped_loop",
          "unmade_tomorrow",
        ].includes(item.identifier),
    )
  }

  set_section(section: "clues" | "relics" | "lives") {
    this.active_section = section
  }

  has_no_inventory(count_statuses = false) {
    for (const index in this.stream.inventory) {
      if (Object.prototype.hasOwnProperty.call(this.stream.inventory, index)) {
        const item = this.stream.inventory[index]
        if (
          (item.is_status ? item.is_status : false) === count_statuses &&
          !item.hidden &&
          item.quantity > 0
        ) {
          return false
        }
      }
    }

    return true
  }
}

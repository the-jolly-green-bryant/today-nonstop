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

  constructor() {}

  ngOnInit() {}

  has_no_inventory(count_statuses = false) {
    for (const index in this.stream.inventory) {
      if (Object.prototype.hasOwnProperty.call(this.stream.inventory, index)) {
        const item = this.stream.inventory[index]
        if (
          (item.is_status ? item.is_status : false) === count_statuses &&
          !item.hidden
        ) {
          return false
        }
      }
    }

    return true
  }
}

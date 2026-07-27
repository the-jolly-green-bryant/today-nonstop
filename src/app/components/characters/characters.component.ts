import { Component, OnInit, Input } from "@angular/core"
import { DialogStream } from "../../classes/dialog-stream"

@Component({
  standalone: false,
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.scss"],
})
export class CharactersComponent implements OnInit {
  @Input() stream: DialogStream = null

  constructor() {}

  ngOnInit() {}

  has_no_characters(count_statuses = false) {
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

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

  has_no_characters() {
    return !this.stream.characters.some((character) => !character.hidden)
  }
}

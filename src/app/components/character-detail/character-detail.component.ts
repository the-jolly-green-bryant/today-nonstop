import { Component, OnInit, Input } from "@angular/core"
import { DialogStream, DialogOption } from "../../classes/dialog-stream"
import dialog_data from "../../game-data/dialog.json"

@Component({
    selector: "app-character-detail",
    templateUrl: "./character-detail.component.html",
    styleUrls: ["./character-detail.component.scss"],
})
export class CharacterDetailComponent implements OnInit {

    @Input() identifier: string = null
    @Input() stream: DialogStream = null

    public game_data: any = dialog_data

    constructor() { }

    ngOnInit() {}

    has_item_in_quantity(item_key: string, quantity: number) {
    	for (const index in this.stream.inventory) {
    		if (this.stream.inventory[index].identifier === item_key
				&& this.stream.inventory[index].quantity >= quantity) {
    			return true
    		}
    	}

    	return false
    }
}

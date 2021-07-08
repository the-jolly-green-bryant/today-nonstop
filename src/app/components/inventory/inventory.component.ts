import { Component, OnInit, Input } from "@angular/core"
import { DialogStream, DialogOption } from "../../classes/dialog-stream"

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {

    @Input() stream: DialogStream = null

    constructor() { }

    ngOnInit() {}

    has_no_inventory(count_statuses = false) {
    	for (const index in this.stream.inventory) {
    		if (this.stream.inventory.hasOwnProperty(index)) {
    			const item = this.stream.inventory[index]
    			if ((item.is_status ? item.is_status : false) === count_statuses && !item.hidden) {
    				return false
    			}
    		}
    	}

    	return true
    }
}

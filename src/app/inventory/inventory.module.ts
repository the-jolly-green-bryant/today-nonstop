import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { InventoryPage } from "./inventory.page"
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module"

import { InventoryPageRoutingModule } from "./inventory-routing.module"
import { InventoryComponent } from "../components/inventory/inventory.component"

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    InventoryPageRoutingModule,
  ],
  declarations: [InventoryPage, InventoryComponent],
})
export class InventoryPageModule {}

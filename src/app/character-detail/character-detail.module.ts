import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CharacterDetailPage } from "./character-detail.page"
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module"

import { CharacterDetailPageRoutingModule } from "./character-detail-routing.module"
import { CharacterDetailComponent } from "../components/character-detail/character-detail.component"

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: "", component: CharacterDetailPage }]),
    CharacterDetailPageRoutingModule,
  ],
  declarations: [CharacterDetailPage, CharacterDetailComponent],
})
export class CharacterDetailPageModule {}

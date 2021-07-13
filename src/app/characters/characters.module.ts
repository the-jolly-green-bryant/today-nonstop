import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CharactersPage } from "./characters.page"
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module"

import { CharactersPageRoutingModule } from "./characters-routing.module"
import { CharactersComponent } from "../components/characters/characters.component"

@NgModule({
  	imports: [
    	IonicModule,
    	CommonModule,
    	FormsModule,
    	ExploreContainerComponentModule,
    	RouterModule.forChild([{ path: "", component: CharactersPage }]),
    	CharactersPageRoutingModule,
  	],
  	declarations: [CharactersPage, CharactersComponent],
  	entryComponents: [CharactersComponent],
})
export class CharactersPageModule {}

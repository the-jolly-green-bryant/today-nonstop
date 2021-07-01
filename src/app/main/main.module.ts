import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { MainPage } from "./main.page"
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module"

import { MainPageRoutingModule } from "./main-routing.module"
import { DialogStreamComponent } from "../components/dialog-stream/dialog-stream.component"

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        MainPageRoutingModule,
    ],
    declarations: [MainPage, DialogStreamComponent],
    entryComponents: [DialogStreamComponent],
})
export class MainPageModule {}

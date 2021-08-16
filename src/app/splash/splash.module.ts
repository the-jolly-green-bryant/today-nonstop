import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { SplashPage } from "./splash.page"
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module"

import { SplashPageRoutingModule } from "./splash-routing.module"

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        SplashPageRoutingModule,
    ],
    declarations: [SplashPage],
    entryComponents: [],
})
export class SplashPageModule {}

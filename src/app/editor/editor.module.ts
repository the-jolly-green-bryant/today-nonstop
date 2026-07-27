import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { EditorPage } from "./editor.page"

import { EditorPageRoutingModule } from "./editor-routing.module"

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, EditorPageRoutingModule],
  declarations: [EditorPage],
})
export class EditorPageModule {}

import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule),
    },
    {
        path: "editor",
        loadChildren: () => import("./editor/editor.module").then(m => m.EditorPageModule),
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

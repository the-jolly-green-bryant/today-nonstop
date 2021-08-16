import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: "game",
        loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule),
    },
    {
        path: "editor",
        loadChildren: () => import("./editor/editor.module").then(m => m.EditorPageModule),
    },
    {
        path: "character-detail",
        loadChildren: () => import("./character-detail/character-detail.module").then(m => m.CharacterDetailPageModule),
    },
    {
        path: "",
        loadChildren: () => import("./splash/splash.module").then(m => m.SplashPageModule)
    },
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "tabs",
        pathMatch: "full",
    },
    {
        path: "*",
        redirectTo: "tabs",
        pathMatch: "full",
    }
    ,

    {
        path: "add-specialists",
        loadChildren: () =>
            import("./add-specialists/add-specialists.module").then(
                (m) => m.AddSpecialistsPageModule
            ),
    },
    {
        path: "tabs",
        loadChildren: () =>
            import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
    },
    {
        path: "login",
        loadChildren: () =>
            import("./pages/login/login.module").then((m) => m.LoginPageModule),
    },
  {
    path: 'feed-update-modal',
    loadChildren: () => import('./pages/feed-update-modal/feed-update-modal.module').then(m => m.FeedUpdateModalPageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

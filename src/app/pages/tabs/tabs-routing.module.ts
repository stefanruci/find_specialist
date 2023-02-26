import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {TabsPage} from "./tabs.page";

const routes: Routes = [
    {
        path: "",
        component: TabsPage,
        children: [
            {
                path: "",
                redirectTo: "landing-page",
                pathMatch: "full",
            },


            {
                path: "messages",
                loadChildren: () =>
                    import("./messages/messages.module").then((m) => m.MessagesPageModule
                    ),
            },
            {
                path: 'search',
                loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
            },
            {
                path: "menu",
                loadChildren: () => import("./menu/menu.module").then(m => m.MenuPageModule),
            },
            {
                path: 'all-feeds',
                loadChildren: () => import('./allFeeds/all-feeds.module').then(m => m.AllFeedsPageModule)
            },
            {
                path: 'user-details',
                loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsPageModule)
            },

            {
                path: 'landing-page',
                loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPagePageModule)
            },
        ],
    },


];

@NgModule({
    imports:
        [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}

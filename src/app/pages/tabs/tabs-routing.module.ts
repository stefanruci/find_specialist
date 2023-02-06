import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "search",
        loadChildren: () =>
          import("./search/search.module").then((m) => m.SearchPageModule),
      },
      {
        path: "messages",
        loadChildren: () =>
          import("./messages/messages.module").then(
            (m) => m.MessagesPageModule
          ),
      },
      {
        path: "menu",
        loadChildren: () =>
          import("./menu/menu.module").then((m) => m.MenuPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

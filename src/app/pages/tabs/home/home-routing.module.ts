import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "client-feed",
    loadChildren: () =>
      import("./client-feed/client-feed.module").then(
        (m) => m.ClientFeedPageModule
      ),
  },
  {
    path: "freelancer-feed",
    loadChildren: () =>
      import("./freelancer-feed/freelancer-feed.module").then(
        (m) => m.FreelancerFeedPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

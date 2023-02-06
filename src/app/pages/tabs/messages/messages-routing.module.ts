import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth/auth.guard";

import { MessagesPage } from "./messages.page";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: MessagesPage,
  },
  {
    path: "message",
    loadChildren: () =>
      import("./message/message.module").then((m) => m.MessagePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}

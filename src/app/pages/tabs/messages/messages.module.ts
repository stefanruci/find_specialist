import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MessagesPageRoutingModule } from "./messages-routing.module";

import { MessagesPage } from "./messages.page";
import { EmptyScreenComponent } from "src/app/components/empty-screen/empty-screen.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    NgbCollapseModule,
  ],
  declarations: [MessagesPage, EmptyScreenComponent],
})
export class MessagesPageModule {}

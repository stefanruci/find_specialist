import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MenuPageRoutingModule } from "./menu-routing.module";

import { MenuPage } from "./menu.page";
import { SidebarModule } from "ng-sidebar";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    IonicModule,
    SidebarModule.forRoot(),
    MenuPageRoutingModule,
    NgbCollapseModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}

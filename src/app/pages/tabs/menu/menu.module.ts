import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {MenuPageRoutingModule} from "./menu-routing.module";

import {MenuPage} from "./menu.page";
import {SidebarModule} from "ng-sidebar";
import {NgbAlert, NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {MyFeedsComponent} from "../../../components/my-feeds/my-feeds.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SidebarModule.forRoot(),
        MenuPageRoutingModule,
        NgbCollapseModule,
        NgbAlert,
    ],
    declarations: [MenuPage, MyFeedsComponent],
})
export class MenuPageModule {
}

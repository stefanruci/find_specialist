import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {HomePageRoutingModule} from "./home-routing.module";

import {HomePage} from "./home.page";

import {SwiperModule} from "swiper/angular";

import {SidebarModule} from "ng-sidebar";
import {AppModule} from "../../../app.module";

@NgModule({
    declarations: [
        HomePage,

    ],
    imports: [
        AppModule,
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        SwiperModule,
        SidebarModule,
    ],
    exports: []
})
export class HomePageModule {
}

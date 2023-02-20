import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {HomePageRoutingModule} from "./home-routing.module";

import {HomePage} from "./home.page";

import {SwiperModule} from "swiper/angular";
import {FeedComponent} from "../../../components/feed/feed.component";
import {AddFeedComponent} from "../../../components/add-feed/add-feed.component";
import {SidebarModule} from "ng-sidebar";

@NgModule({
    declarations: [
        HomePage,
        FeedComponent,
        AddFeedComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        SwiperModule,
        SidebarModule,
    ],
})
export class HomePageModule {
}

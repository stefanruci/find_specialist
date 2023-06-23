import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LandingPagePageRoutingModule} from './landing-page-routing.module';

import {LandingPagePage} from './landing-page.page';
import {AppModule} from "../../../app.module";
import {RouterModule} from "@angular/router";
import {FeedComponent} from "../../../components/feed/feed.component";
import {AddFeedComponent} from "../../../components/add-feed/add-feed.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LandingPagePageRoutingModule,
    ],
    exports: [
        FeedComponent
    ],
    declarations: [LandingPagePage, FeedComponent, AddFeedComponent]
})
export class LandingPagePageModule {
}

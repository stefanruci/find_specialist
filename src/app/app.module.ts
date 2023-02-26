import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {SpecialistServiceService} from "./services/specialist-service.service";
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService,} from "@angular/fire/analytics";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {getMessaging, provideMessaging} from "@angular/fire/messaging";
import {getPerformance, providePerformance} from "@angular/fire/performance";
import {getRemoteConfig, provideRemoteConfig,} from "@angular/fire/remote-config";

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore/";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {FormsModule} from "@angular/forms";
import {SwiperModule} from "swiper/angular";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FeedComponent} from "./components/feed/feed.component";
import {AddFeedComponent} from "./components/add-feed/add-feed.component";

@NgModule({
    declarations: [
        AppComponent,
        AddFeedComponent,

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        SwiperModule,
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAnalytics(() => getAnalytics()),
        provideDatabase(() => getDatabase()),
        provideFunctions(() => getFunctions()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        provideRemoteConfig(() => getRemoteConfig()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        NgbModule,
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        SpecialistServiceService,
        ScreenTrackingService,
        UserTrackingService,
    ],
    bootstrap: [AppComponent],
    exports: [
    ]
})
export class AppModule {
}

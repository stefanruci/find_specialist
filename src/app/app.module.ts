import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SpecialistServiceService } from './services/specialist-service.service';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';

import {AngularFireModule} from'@angular/fire/compat';
import {AngularFirestoreModule} from'@angular/fire/compat/firestore/';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [AppComponent,LoginComponent,RegisterComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule ,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
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
  provideFirebaseApp(() => initializeApp(environment.firebase))
     ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpecialistServiceService,
    ScreenTrackingService,UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}


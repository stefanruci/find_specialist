import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { SpecialistFeedListComponent } from "src/app/components/specialist-feed-list/specialist-feed-list.component";
import { ClientFeedListComponent } from "src/app/components/client-feed-list/client-feed-list.component";
import { SwiperModule } from "swiper/angular";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";

@NgModule({
  declarations: [
    HomePage,
    SpecialistFeedListComponent,
    ClientFeedListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
  ],
})
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreelancerFeedPageRoutingModule } from './freelancer-feed-routing.module';

import { FreelancerFeedPage } from './freelancer-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreelancerFeedPageRoutingModule
  ],
  declarations: [FreelancerFeedPage]
})
export class FreelancerFeedPageModule {}

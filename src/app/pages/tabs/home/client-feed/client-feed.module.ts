import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFeedPageRoutingModule } from './client-feed-routing.module';

import { ClientFeedPage } from './client-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientFeedPageRoutingModule
  ],
  declarations: [ClientFeedPage]
})
export class ClientFeedPageModule {}

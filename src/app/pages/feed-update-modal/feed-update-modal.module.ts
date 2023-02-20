import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedUpdateModalPageRoutingModule } from './feed-update-modal-routing.module';

import { FeedUpdateModalPage } from './feed-update-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedUpdateModalPageRoutingModule
  ],
  declarations: [FeedUpdateModalPage]
})
export class FeedUpdateModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllFeedsPageRoutingModule } from './all-feeds-routing.module';

import { AllFeedsPage } from './all-feeds.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AllFeedsPageRoutingModule,
    ],
  declarations: [AllFeedsPage]
})
export class AllFeedsPageModule {}

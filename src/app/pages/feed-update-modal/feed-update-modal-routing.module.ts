import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedUpdateModalPage } from './feed-update-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FeedUpdateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedUpdateModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFeedPage } from './client-feed.page';

const routes: Routes = [
  {
    path: '',
    component: ClientFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFeedPageRoutingModule {}

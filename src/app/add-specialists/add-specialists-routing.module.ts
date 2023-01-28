import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSpecialistsPage } from './add-specialists.page';

const routes: Routes = [
  {
    path: '',
    component: AddSpecialistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSpecialistsPageRoutingModule {}

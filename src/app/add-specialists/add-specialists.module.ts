import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddSpecialistsPageRoutingModule } from "./add-specialists-routing.module";

import { AddSpecialistsPage } from "./add-specialists.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    AddSpecialistsPageRoutingModule,
  ],
  declarations: [AddSpecialistsPage],
})
export class AddSpecialistsPageModule {}

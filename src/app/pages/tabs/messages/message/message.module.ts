import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MessagePageRoutingModule } from "./message-routing.module";

import { MessagePage } from "./message.page";
import { EmptyScreenComponent } from "src/app/components/empty-screen/empty-screen.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MessagePageRoutingModule],
  declarations: [MessagePage],
})
export class MessagePageModule {}

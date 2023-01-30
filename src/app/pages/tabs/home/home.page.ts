import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

async openModal() {
  const modal = await this.modalCtrl.create({
    component: LoginComponent
  });
  return await modal.present();
}

  ngOnInit() {
  }

}

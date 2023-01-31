import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { HomePage } from '../pages/tabs/home/home.page';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    @Input() username: string='';
  @Input() password: string='';
  @Input() userType: string='';

  constructor(private modalCtrl: ModalController,private rute: NavController) { }

  ngOnInit() {

 
  }
      
  
  login() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
  }

  async signUp() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
        await this.modalCtrl.dismiss();
    this.openModal();
  }

  async closeModal() {
    this.rute.navigateRoot(['tabs/home/']);
    await this.modalCtrl.dismiss();
   

}
async openModal() {
  const modal = await this.modalCtrl.create({
    component: RegisterComponent,
    cssClass: 'modal-large'
  });
  return await modal.present();
}
}

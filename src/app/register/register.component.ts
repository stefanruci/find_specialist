import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


 @Input() username: string='';
  @Input() password: string='';
  @Input() userType: string='';

  constructor(private modalCtrl: ModalController,private  rute: NavController) { }

  ngOnInit() {

 
  }
      
  
 
  
  register() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
  }

  async closeModal() {
  this.rute.navigateRoot(['tabs/home/']);
  await  this.modalCtrl.dismiss();


}
async openLoginModal() {
 await this.modalCtrl.dismiss();

  const modal = await this.modalCtrl.create({
    component: LoginComponent,
    cssClass: 'modal-large'
  });
  return await modal.present();
}
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

 
  }
      
  
  login() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
  }

  signUp() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
    this.openModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();

}
async openModal() {
  const modal = await this.modalCtrl.create({
    component: RegisterComponent
  });
  return await modal.present();
}
}

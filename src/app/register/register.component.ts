import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

 
  }
      
  
 
  
  register() {
    console.log(`Logging in as ${this.userType}`);
    // Perform the login logic here, using the selected user type
  }

  closeModal() {
    this.modalCtrl.dismiss();

}
async openLoginModal() {
  const modal = await this.modalCtrl.create({
    component: LoginComponent
  });
  return await modal.present();
}
}

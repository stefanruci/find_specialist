import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { LoginComponent } from "../login/login.component";
import { User } from "../model/user/user.model";
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  isTypePassword: boolean = true;
  isLoading: boolean = false;

  user: User = {
    id: "",
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    userType: "",
    location: "",
    profilePictureUrl: "",
  };

  constructor(
    private modalCtrl: ModalController,
    private rute: NavController,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  register() {
    this.isLoading = true;
    console.log(this.user.email, "is  emty");
    if (this.user.email != "") {
      console.log(this.user.email ,'is not emty');

      this.authService
        .register(this.user)
        .then((data: any) => {
          this.router.navigateByUrl("/tabs/home");
          this.isLoading = false;
          this.user = {
            id: "",
            name: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            userType: "",
            location: "",
            profilePictureUrl: "",
          };
        })
        .catch((e) => {
          console.log(this.user);

          console.log(e);
          // this.global.hideLoader();
          this.isLoading = false;
          let msg: string = "Could not sign you up, please try again.";
          if (e.code == "auth/email-already-in-use") {
            msg = e.message;
          }
          this.showAlert(e);
        });
    }

    // Perform the login logic here, using the selected user type
  }

  async closeModal() {
    this.router.navigateByUrl("tabs/home/");
    await this.modalCtrl.dismiss();
  }
  async openLoginModal() {
    await this.modalCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: "modal-large",
    });
    return await modal.present();
  }

  async showAlert(msg) {
    const alert = await this.alertController.create({
      header: "Alert?",
      cssClass: "custom-alert",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }
}

import { Component, OnInit } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { map, Observable } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { ApiService } from "src/app/services/api/api.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "../../model/user/user.model";
import { HomePage } from "../../pages/tabs/home/home.page";
import { ForgotpasswordComponent } from "../forgotpassword/forgotpassword.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  isTypePassword: boolean = true;
  isLogin: boolean = false;
  selectedUser: User = new User();

  constructor(
    private modalCtrl: ModalController,
    private rute: NavController,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.getUserByEmail(this.email).subscribe(
    //   (user) => (this.selectedUser = user)
    // );
  }
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  login() {
    this.authService
      .login(this.email, this.password)
      .then((data: any) => {
        this.isLogin = true;
        console.log("is login :", this.isLogin);

        // this.router.navigateByUrl("./tabs/home");
      })
      .catch((e) => {
        console.log(e);
        this.isLogin = false;
        let msg: string = "Could not sign you in, please try again.";
        if (e.code == "auth/user-not-found")
          msg = "E-mail address could not be found";
        else if (e.code == "auth/wrong-password")
          msg = "Please enter a correct password";
        this.showAlert(msg);
      });
  }

  forgotPass() {
    console.log("this.forgotPass");
    this.openPassModal();
  }

  async signUp() {
    // Perform the login logic here, using the selected user type
    await this.modalCtrl.dismiss();
    this.openRegisterModal();
  }

  async closeModal() {
    this.rute.navigateRoot(["tabs/home/"]);
    await this.modalCtrl.dismiss();
  }
  async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterComponent,
      cssClass: "modal-large",
    });
    return await modal.present();
  }
  async openPassModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotpasswordComponent,
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

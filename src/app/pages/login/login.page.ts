import {Component, OnInit} from "@angular/core";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {
    ModalController,
    NavController,
    AlertController,
} from "@ionic/angular";
import {Observable, async} from "rxjs";
import {ForgotpasswordComponent} from "src/app/components/forgotpassword/forgotpassword.component";
import {RegisterComponent} from "src/app/components/register/register.component";
import {User} from "src/app/model/user/user.model";
import {ApiService} from "src/app/services/api/api.service";
import {AuthService} from "src/app/services/auth/auth.service";
import {RouterService} from "../../services/routerService/router.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
    email: string = "";
    password: string = "";

    isTypePassword: boolean = true;
    isLogin: boolean = false;
    selectedUser: User = new User();

    constructor(
        private modalCtrl: ModalController,
        private rute: NavController,
        private authService: AuthService,
        private routerService: RouterService,
        private alertController: AlertController,
        private apiService: ApiService
    ) {

    }

    currentUser: User;

    ngOnInit() {



        // this.getUserByEmail(this.email).subscribe(
        //   (user) => (this.selectedUser = user)
        // );
    }


    users: Observable<User[]>;
    usersCollection: AngularFirestoreCollection<User>;
// Get the input field and the button


// Execute a function when the user presses the Enter key

    login() {
        this.authService
            .login(this.email, this.password)
            .then((data: any) => {
                this.isLogin = true;
                console.log("is login :", this.isLogin);
                this.routerService.navigate("/tabs");

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

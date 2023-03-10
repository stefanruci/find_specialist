import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, AlertController} from '@ionic/angular';
import {User} from 'src/app/model/user/user.model';
import {AuthService} from 'src/app/services/auth/auth.service';
import {RouterService} from "../../../services/routerService/router.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


    reTypePassword: string = "";
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
        pershkrim: '',

    };

    constructor(
        private modalCtrl: ModalController,
        private routerService: RouterService,
        private authService: AuthService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    isSamePassword: boolean = true;

    isSamePass() {
        this.isSamePassword = this.user.password === this.reTypePassword;
    }

    register() {
        this.isLoading = true;
        console.log(this.user.email, "is  emty");
        if (this.user.email != "") {
            console.log(this.user.email, "is not emty");

            this.authService
                .register(this.user)

                .then((data: any) => {
                    this.routerService.navigate("/tabs/landing-page");
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
                        pershkrim: '',

                    };
                })
                .catch((e) => {
                    console.log(this.user);

                    console.log(e);
                    // this.global.hideLoader();
                    this.isLoading = false;
                    let msg: string = "Could not sign you up, please try again.";
                    if (e.code == "auth/email-already-in-use") {
                        msg = "Email already in use ";
                    }
                    this.showAlert(e.code);
                });
        }

        // Perform the login logic here, using the selected user type
    }

    async closeModal() {
        await this.routerService.navigate("/tabs/landing-page");
        await this.modalCtrl.dismiss();
    }

     openLoginModal() {
        this.routerService.navigate("/login")
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


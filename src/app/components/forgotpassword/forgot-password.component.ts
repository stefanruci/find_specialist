import {Component, OnInit} from "@angular/core";
import {AlertController, ModalController} from "@ionic/angular";
import {AuthService} from "src/app/services/auth/auth.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
    constructor(
        private modalCtrl: ModalController,
        private authService: AuthService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    email: string = "";

    resetPass() {
        try {
            if (this.email.length !== 0) {
                this.authService.resetUserPassword(this.email);
                this.closeModal;
                console;
            }
        } catch (e) {
            // @ts-ignore
            this.showAlert(e.code);
        }
    }

    async showAlert(msg: any) {
        const alert = await this.alertController.create({
            header: "Alert?",
            cssClass: "custom-alert",
            message: msg,
            buttons: ["OK"],
        });
        await alert.present();
    }
}

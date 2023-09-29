import {Component, Input, OnInit} from '@angular/core';
import {ForgotPasswordComponent} from "../forgotpassword/forgot-password.component";
import {ModalController} from "@ionic/angular";
import {Feed} from "../../model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {RouterService} from "../../services/routerService/router.service";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {timestamp} from "rxjs";
import * as moment from "moment";


@Component({
    selector: 'app-add-feed',
    templateUrl: './add-feed.component.html',
    styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent implements OnInit {
    feed: Feed = {
        id: "",
        kompania: "",
        vendodhja: "",
        pershkrim: "",
        tittle: "",
        time:  moment(new Date()),
        userName: "",
        userType: ""

    }

    constructor(private routerService: RouterService, private modalCtrl: ModalController, private apiService: ApiService, private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.feed.id = this.randomIntFromInterval(10000, 200000).toString();
        this.feed.userType = this.authService.userType;
        this.authService.getCurrentUser().subscribe((el: { data: () => { (): any; new(): any; username: { (): any; new(): any; toString: { (): string; new(): any; }; }; }; }) => {
            if (el) {
                console.log(el, 'el')
                this.feed.userName = el.data().username.toString();
                console.log(this.feed.userName, 'feed username')

            }
        });
        setTimeout(() => {
            // your code here

        }, 50);

    }


    addFeed() {
        this.feed.time = moment(new Date());

        return this.apiService.addFeed(this.feed).then(r => {
            this.closeModal().then(r => this.routerService.navigate("/tabs/landing-page"));


        }).catch(error => {
            console.error(error);
        });

    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}

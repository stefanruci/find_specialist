import {Component, Input, OnInit} from '@angular/core';
import {ForgotpasswordComponent} from "../forgotpassword/forgotpassword.component";
import {ModalController} from "@ionic/angular";
import {Feed} from "../../model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {RouterService} from "../../services/routerService/router.service";

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
        time: new Date(),
        userName: "",
        userType: ""

    }

    constructor(private routerService: RouterService, private modalCtrl: ModalController, private apiService: ApiService, private authService: AuthService
    ) {
    }

    ngOnInit() {

    }


    addFeed() {
        this.feed.id = this.randomIntFromInterval(10000, 200000).toString();
        this.feed.time = new Date();
        this.feed.userType = this.authService.userType;
        this.authService.getCurrentUser().subscribe(el => {
            this.feed.userName = el.username;
        });
        return this.apiService.addFeed(this.feed).then(r => {
            this.routerService.navigate("/tabs/home")

        }).catch(error => {
            console.error(error);
        });

    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

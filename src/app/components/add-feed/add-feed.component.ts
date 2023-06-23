import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Feed} from "../../model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {RouterService} from "../../services/routerService/router.service";


@Component({
    selector: 'app-add-feed',
    templateUrl: './add-feed.component.html',
    styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent implements OnInit {
    feed: Feed = {
        tel: "",
        userType: "",
        whatsApp: "",
        id: "",
        kompania: "",
        vendodhja: "",
        pershkrim: "",
        tittle: "",
        time:new Date(),
        userName: ""


    }

    constructor(private routerService: RouterService, private modalCtrl: ModalController, private apiService: ApiService, private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.feed.id = this.randomIntFromInterval(10000, 200000).toString();
        this.feed.userType = this.authService.userType;
        this.authService.getCurrentUser().subscribe(el => {
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
        this.feed.time =new Date();

        return this.apiService.addFeed(this.feed).then(r => {
            this.closeModal().then(r => this.routerService.navigate("/tabs/landing-page"));


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

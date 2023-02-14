import {Component, Input, OnInit} from '@angular/core';
import {ForgotpasswordComponent} from "../forgotpassword/forgotpassword.component";
import {ModalController} from "@ionic/angular";
import {Feed} from "../../model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";

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

    constructor(private modalCtrl: ModalController, private apiService: ApiService, private authService: AuthService
    ) {
    }

    ngOnInit() {

    }


    addFeed() {
        this.feed.time = new Date();
        this.feed.userType = this.authService.userType;
        this.authService.getCurrentUser().subscribe(el => {
            this.feed.userName = el.username;
        });
        this.apiService.addFeed(this.feed);

    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

}

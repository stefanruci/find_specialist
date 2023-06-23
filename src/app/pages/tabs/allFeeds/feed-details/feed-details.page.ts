import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Feed} from "../../../../model/feed/feed.model";
import {ApiService} from "../../../../services/api/api.service";
import {FeedService} from "../../../../services/feed-service/feed.service";
import {FeedUpdateModalPage} from "../../../feed-update-modal/feed-update-modal.page";
import {ModalController} from "@ionic/angular";
import {User} from "../../../../model/user/user.model";


@Component({
    selector: 'app-feed-details',
    templateUrl: './feed-details.page.html',
    styleUrls: ['./feed-details.page.scss'],
})
export class FeedDetailsPage implements OnInit {
    feed: Feed = {
        kompania: "",
        vendodhja: "",
        userType: "",
        id: "",
        userName: "",
        tittle: "",
        pershkrim: " ",
        time: new Date(),
        whatsApp: '',
        tel: ''
    };


    validID: boolean = true;
    private user: User = {
        email: "",
        id: "",
        lastName: "",
        location: "",
        name: "",
        password: "",
        pershkrim: "",
        profilePictureUrl: "",
        userType: "",
        username: ""
    };

    constructor(private route: ActivatedRoute, private apiService: ApiService, private feedService: FeedService, private modalController: ModalController) {
    }

    ngOnInit() {
        if (this.feedService.authService.isLogin == true) {
            this.feedService.getCurrentUser().subscribe((user) => {
                if (user.data()) {
                    this.user = user.data();
                    this.validID = true;
                } else this.validID = true;


            });
        } else {
            this.validID = true;

        }


        this.feed.id = this.route.snapshot.paramMap.get('id').trim();
        console.log(this.route.snapshot.paramMap.get('id'), "feed id")
        this.setFeed();

        setTimeout(() => {
            if (this.user.id != "") {
                this.validID = true;
            } else this.validID = true;
        }, 3000)


    }

    setFeed() {
        return this.apiService.getFeed(this.feed.id).subscribe((el) => {
                this.feed = el.data();

            }
        );
    }


    convertDate(date: Date) {
        return this.feedService.covertDate(date)

    }

    isValidID() {
        if (this.feed.userName == "") {
            return false
        } else {
            return true

        }
    }

    shfaqu(feed: Feed) {
        if (this.user.username != "") {
            return this.user.username == feed.userName;
        } else return false
    }

    async editFeed(feed: Feed) {
        const modal = await this.modalController.create({
            component: FeedUpdateModalPage,
            componentProps: {
                feed: feed,
            },
        });
        await modal.present();
    }

}

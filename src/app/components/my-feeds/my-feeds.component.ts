import {Component, Input, OnInit} from '@angular/core';
import {Feed} from "../../model/feed/feed.model";
import {FeedService} from "../../services/feed-service/feed.service";
import {User} from "../../model/user/user.model";
import {FeedUpdateModalPage} from "../../pages/feed-update-modal/feed-update-modal.page";
import {ModalController} from "@ionic/angular";
import * as moment from "moment/moment";

@Component({
    selector: 'app-my-feeds',
    templateUrl: './my-feeds.component.html',
    styleUrls: ['./my-feeds.component.scss'],
})
export class MyFeedsComponent implements OnInit {
    feedList: Feed[] = [];
    feedListLen: number = 0;
    @Input()
    userType: string = '';
    @Input()
    userName: string = '';

    @Input() currentUser: User = {
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

    constructor(private feedService: FeedService, private modalController: ModalController) {
    }

    ngOnInit() {
        // this.currentUser.username = sessionStorage.getItem('userName');
        // // this.currentUser.userType = sessionStorage.getItem('userType');
        // console.log(this.currentUser.userType = sessionStorage.getItem('userType'), "userType")
        // console.log(this.currentUser.userType = sessionStorage.getItem('userName'), "userName")

        console.log(this.userType, "user t on my feeds")
        console.log(this.userName, "user N on my feeds")
        this.feedService.userType = this.userType;
        if (this.userType == 'F') {
            this.feedService.userType = 'F';
            this.feedService.setSpecialistFeeds()
                .subscribe(list => {
                    this.feedList = list.filter(feed => feed.userName = this.userName);

                    console.log(this.feedListLen)
                    this.convertFeedsTime();

                })
        } else if (this.userType == 'P') {
            this.feedService.userType = 'P';
            this.feedService.setClientFeeds()
                .subscribe(list => {
                    this.feedList = list.filter(feed => feed.userName = this.userName);
                    console.log(this.feedListLen)

                    this.convertFeedsTime();


                })
        } else {
            this.feedList = this.feedService.feedList;
            this.feedList.concat(this.feedService.feedList);

        }

        setTimeout(() => {
                this.feedListLen = this.feedList.length;
            }
            , 500)
        console.log(this.userName, " udrt", this.userType)
    }

    onFeedClick(feed: any) {

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

    shfaqu(feed: Feed) {
        return feed.userName == this.userName

    }

    convertFeedsTime() {
        this.feedList.forEach(feed => {
            feed.time = this.covertDateToMoment(feed.time);
        })

    }

    private covertDateToMoment(time: any) {
        return moment(time.toDate());
        ;
    }

}

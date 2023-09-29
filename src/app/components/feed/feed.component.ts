import {Component, Input, OnInit} from "@angular/core";
import {Feed} from "src/app/model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {FeedService} from "../../services/feed-service/feed.service";
import * as moment from "moment";
import {RouterService} from "../../services/routerService/router.service";
import {FeedUpdateModalPage} from "../../pages/feed-update-modal/feed-update-modal.page";
import {ModalController} from "@ionic/angular";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user/user.model";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
    feedListLen: any;
    feedList: Feed[] = [];
    feed: Feed = {
        kompania: "kompania",
        vendodhja: "location",
        userType: "F",
        id: "id",
        userName: "username",
        tittle: "tittle",
        pershkrim: " Here's a small text description for the card content. Nothing more,\n" +
            "                        nothing less.This will set the height of the \"my-component\" element to the height of its content or the height of its parent container, whichever is smaller. Again, this property can be used with any HTML element, including Ionic components.",
        time: moment(new Date()),
    };
    @Input()
    elementsToShow: any = 0;
    @Input()
    userType: string = "A";
    currentUser: User = {
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

    constructor(
        private apiService: ApiService,
        private feedService: FeedService,
        private routerService: RouterService,
        private modalController: ModalController,
        private authService: AuthService) {


    }

    ngOnInit() {
        this.feedService.userType = this.userType;
        if (this.userType == 'F') {
            this.feedService.userType = 'F';
            this.feedService.setSpecialistFeeds()
                .subscribe(list => {
                    this.feedList = list;
                    this.feedListLen
                        = this.feedList.length;

                    console.log(this.feedListLen)
                    this.convertFeedsTime();
                })
        } else if (this.userType == 'P') {
            this.feedService.userType = 'P';
            this.feedService.setClientFeeds()
                .subscribe(list => {
                    this.feedList = list;

                    this.feedListLen = this.feedList.length.valueOf();
                    console.log(this.feedListLen)
                    this.convertFeedsTime();
                })


        } else {
            this.feedList = this.feedService.feedList;
            this.feedList.concat(this.feedService.feedList);

        }

        setTimeout(() => {
            // your code here
            if (this.elementsToShow == 0) {
                this.elementsToShow = this.feedList.length;
            }
        }, 50)

        this.setUser()

    }

    onFeedClick(clientFeed: Feed) {
        //
        // // this.router.navigateByUrl("/tabs/  [routerLink]=\"['/../tabs/all-feeds' ,'P']\"\n", {replaceUrl: true}).then(r => {
        // // });
        // this.routerService.navigateWithData(['/../tabs/all-feeds', 'P'], clientFeed).then(r =>{
        //
        // })
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    convertFeedsTime() {
        this.feedList.forEach(feed => {
            feed.time = this.covertDateToMoment(feed.time);
        })

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

    appear(feed: Feed): boolean {


        if (this.currentUser.username !== "") {
            return feed.userName == this.currentUser.username && feed.userType == this.currentUser.userType;
        } else {
            return false;
        }
    }

    private covertDateToMoment(time: any) {
        return moment(time.toDate());
        ;
    }


    setUser() {

        this.feedService.getCurrentUser().subscribe((user: { data: () => User; }) => {

                this.currentUser = user.data();
                console.log(this.currentUser, "feed comp")
            }
        )
    }

}

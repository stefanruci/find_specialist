import {Component, Input, OnInit} from "@angular/core";
import {Feed} from "src/app/model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {FeedService} from "../../services/feed-service/feed.service";
import {RouterService} from "../../services/routerService/router.service";
import {FeedUpdateModalPage} from "../../pages/feed-update-modal/feed-update-modal.page";
import {ModalController} from "@ionic/angular";
import {User} from "../../model/user/user.model";
import {Timestamp} from "firebase/firestore";


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
        time: new Date(),
    };
    @Input()
    elementsToShow: any = 0;
    @Input()
    userType: string = "A";
    @Input()
    userID: string = " ";
    dataLoaded: boolean = false;


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
    ) {


    }

    ngOnInit() {


        console.log(this.userID, "userid on feed")
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
        }, 1000)

        if (this.userID != "") {
            this.setUser()

        } else {
            this.dataLoaded = true;
        }

    }

    onFeedClick(clientFeed: Feed) {
        //
        // // this.router.navigateByUrl("/tabs/  [routerLink]=\"['/../tabs/all-feeds' ,'P']\"\n", {replaceUrl: true}).then(r => {
        // // });
        // this.routerService.navigateWithData(['/../tabs/all-feeds', 'P'], clientFeed).then(r =>{
        //
        // })
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    convertFeedsTime() {
        this.feedList.forEach(feed => {
            feed.time = Timestamp.fromDate(feed.time).toDate();
            console.log(feed.time, "Timestamps")
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
        if (this.currentUser.id != "") {
            return feed.userName == this.currentUser.username && feed.userType == this.currentUser.userType.charAt(0);

        } else {
            return false;
        }

    }

    covertDateToDDMM(time: any): string {

        // console.log(Timestamp.fromDate(time.toDate()).toDate(), "timestamp");
        return this.feedService.covertDate(time);

        // return  new Date(time.getSeconds()*1000+time.getMilliseconds()/1000).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit'});
    }


    setUser() {
        return this.apiService.getUser(this.userID).subscribe((user) => {
                this.currentUser = user.data();
                this.dataLoaded = true;
                console.log(this.currentUser, "feed comp")

            }
        )
    }


}

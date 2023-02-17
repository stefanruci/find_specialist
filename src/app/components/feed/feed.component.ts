import {Component, Input, OnInit} from "@angular/core";
import {Feed} from "src/app/model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";
import {FeedService} from "../../services/feed-service/feed.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
    FeedList: Feed[] = [];
    feed: Feed = {
        kompania: "kompania",
        vendodhja: "location",
        userType: "F",
        id: "id",
        userName: "username",
        tittle: "tittle",
        pershkrim: " Here's a small text description for the card content. Nothing more,\n" +
            "                        nothing less.This will set the height of the \"my-component\" element to the height of its content or the height of its parent container, whichever is smaller. Again, this property can be used with any HTML element, including Ionic components.",
        time: new Date()
    };
    @Input()
    elementsToShow: number = this.FeedList.length;
    @Input()
    userType: string = "";

    constructor(
        // private router: Router,
        private apiService: ApiService,
        private feedService: FeedService) {
    }

    ngOnInit() {
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.push(this.feed);
        // this.clientFeedList.forEach(feed => {
        //     feed.id = this.randomIntFromInterval(10000, 200000).toString();
        //     feed.userName = 'Punedhenes1997';
        //     feed.userType='P'
        //     this.apiService.addFeed(feed);
        //
        // })
        this.FeedList = this.feedService.clientFeedList.concat(this.feedService.clientFeedList).filter(feed =>
            feed.userType = this.userType
        );
    }

    onFeedClick(clientFeed: Feed) {

        // this.router.navigateByUrl("/home", {replaceUrl: true}).then(r => {});

    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}

import {Component, Input, OnInit} from "@angular/core";
import {Feed} from "src/app/model/feed/feed.model";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
    clientFeedList: Feed[] = [];
    feed: Feed = {
        kompania: "kompania",
        vendodhja: "location",
        userType: "type",
        id: "id",
        userName: "username",
        tittle: "tittle",
        pershkrim: " Here's a small text description for the card content. Nothing more,\n" +
            "                        nothing less.This will set the height of the \"my-component\" element to the height of its content or the height of its parent container, whichever is smaller. Again, this property can be used with any HTML element, including Ionic components.",
        time: new Date()
    };
    @Input()
    elementsToShow: number = this.clientFeedList.length;
    @Input()
    elementType: string = "";

    constructor() {
    }

    ngOnInit() {
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
        this.clientFeedList.push(this.feed);
    }

    onFeedClick(clientFeed: Feed) {
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { Feed } from "src/app/model/feed/feed.model";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  clientFeedList: Feed[] = [];
  feed: Feed = {
    id: "id",
    userName: "username",
    tittle: "tittle",
    pershkrim: "decr",
    address: "addr",
    time: new Date(),
  };
  @Input()
  elementsToShow: number = this.clientFeedList.length;
  @Input()
  elementType: string = "";
  constructor() {}

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
  onFeedClick(clientFeed: Feed) {}
}

import { Component, Input, OnInit } from "@angular/core";
import { Feed } from "../../model/feed/feed.model";

@Component({
  selector: "app-client-feed-list",
  templateUrl: "./client-feed-list.component.html",
  styleUrls: ["./client-feed-list.component.scss"],
})
export class ClientFeedListComponent implements OnInit {
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

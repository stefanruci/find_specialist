import {Component, OnInit} from '@angular/core';
import {Feed} from "../../../model/feed/feed.model";
import {ApiService} from "../../../services/api/api.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],

})
export class SearchPage implements OnInit {


    ngOnInit() {
    }

    searchWord: string = "";
    segment: string = 'F';
    searchedFeeds: Feed[] = [];
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

    constructor(private apiService: ApiService) {

    }


    onSearch() {
        // this.feed.id=this.randomIntFromInterval(1000,100000).toString()
        // this.apiService.addFeed(this.feed)
        console.log("onSearch() works " + this.searchWord);
        if (this.searchWord.length > 0) {
            this.getSearchedFeeds();
        } else {
            console.log('empty field')
        }
    }

    onSegmentChanged(event: any) {
        console.log(event);
        this.segment = event.detail.value;
    }

    getSearchedFeeds() {
        this.apiService.filterFeedData(this.segment)
            .subscribe(
                (el) => {
                    this.searchedFeeds = el.filter(feed => feed.tittle.includes(this.searchWord) || feed.pershkrim.includes(this.searchWord) || feed.vendodhja.includes(this.searchWord));

                }
            )


    }

    onFeedClick(feed: Feed) {

    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

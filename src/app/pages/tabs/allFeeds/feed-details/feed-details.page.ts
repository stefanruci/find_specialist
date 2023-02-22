import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Feed} from "../../../../model/feed/feed.model";
import {ApiService} from "../../../../services/api/api.service";
import * as moment from "moment";
import {FeedService} from "../../../../services/feed-service/feed.service";
import firebase from "firebase/compat";


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

    constructor(private route: ActivatedRoute, private apiService: ApiService, private feedService: FeedService) {
    }

    ngOnInit() {
        this.feed.id = this.route.snapshot.paramMap.get('id');


        this.setFeed();

    }

    setFeed() {
        this.apiService.getFeed(this.feed.id).subscribe((el) => {
                this.feed = el.data();
            }
        );
        console.log(this.feed, "feed")
    }


    covertDate(date) {
        const timestamp = firebase.firestore.Timestamp.fromDate(date);

        return moment(timestamp).format("DD/MM").toString();
    }
}

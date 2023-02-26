import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Feed} from "../../../../model/feed/feed.model";
import {ApiService} from "../../../../services/api/api.service";
import * as moment from "moment/moment";
import {FeedService} from "../../../../services/feed-service/feed.service";


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
        time: moment(new Date()),
        whatsApp: '',
        tel: ''
    };


    validID: boolean = true;

    constructor(private route: ActivatedRoute, private apiService: ApiService, private feedService: FeedService) {
    }

    ngOnInit() {
        this.feed.id = this.route.snapshot.paramMap.get('id').trim();

        console.log(this.route.snapshot.paramMap.get('id'), "ruse id")
        this.setFeed();


    }

    setFeed() {
        return this.apiService.getFeed(this.feed.id).subscribe((el) => {
                this.feed = el.data();
                if (el.data()) {
                    this.feed.time = this.convertDate(el.data().time);
                    this.validID = true;
                } else this.validID = false;

            }
        );
    }


    convertDate(date: any) {
        return moment(date.toDate())
        // .format("DD/MM")

    }

    isValidID() {
        if (this.feed.userName == "") {
            return false
        } else {
            return true

        }
    }
}

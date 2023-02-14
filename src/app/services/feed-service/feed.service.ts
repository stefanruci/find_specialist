import {Injectable} from '@angular/core';
import {Feed} from "../../model/feed/feed.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ApiService} from "../api/api.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/user/user.model";
import {first, map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedService {


    correntUser: User;
    clientFeedList: Feed[] = [];
    feed: Feed = {
        kompania: "kompanai",
        vendodhja: "location",
        id: "id",
        userName: "username",
        tittle: "tittle",
        pershkrim: "decr",
        address: "addr",
        time: new Date(),
        userType: "type"
    };

    constructor(private authService: AuthService,
                private apiService: ApiService) {
        this.authService.getCurrentUser().subscribe(user => this.correntUser = user);
    }

    getSpecialistFeeds(): Feed[] {
        let feedList: Feed[];
        this.apiService.filterFeedData('S').subscribe(list => {
            feedList = list;
        });
        return feedList;
    }

    getClientFeeds(): Feed[] {
        let feedList: Feed[];
        this.apiService.filterFeedData('P').subscribe(list => {
            feedList = list;
        });
        return feedList;
    }

    addFeed(feed: Feed) {
        this.apiService.addFeed(feed);
    }

    updateFeedFieldById(id: string, pFeed: Partial<Feed>) {
        this.apiService.updateFeedFieldById(id, pFeed);
    }

    deleteFeed(id: string) {
        this.apiService.deleteFeed(id);

    }


}

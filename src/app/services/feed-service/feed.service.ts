import {Injectable} from "@angular/core";
import {User} from "../../model/user/user.model";
import {Feed} from "../../model/feed/feed.model";
import {AuthService} from "../auth/auth.service";
import {ApiService} from "../api/api.service";


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
        time: new Date(),
        userType: "type"
    };

    constructor(private authService: AuthService,) {
        this.authService.getCurrentUser().subscribe(user => this.correntUser = user);
    }

    getSpecialistFeeds(): Feed[] {
        let feedList: Feed[];
        this.authService.apiService.filterFeedData('S').subscribe(list => {
            feedList = list;
        });
        return feedList;
    }

    getClientFeeds(): Feed[] {
        let feedList: Feed[];
        this.authService.apiService.filterFeedData('P').subscribe(list => {
            feedList = list;
        });
        return feedList;
    }


    addFeed(feed: Feed) {
        this.authService.apiService.addFeed(feed).then(r => {
        });
    }

    updateFeedFieldById(id: string, pFeed: Partial<Feed>) {
        this.authService.apiService.updateFeedFieldById(id, pFeed).then(r => {
        });
    }

    deleteFeed(id: string) {
        this.authService.apiService.deleteFeed(id).then(r => {
        });

    }


}

import {Injectable, OnInit, ViewChild} from "@angular/core";
import {User} from "../../model/user/user.model";
import {Feed} from "../../model/feed/feed.model";
import {AuthService} from "../auth/auth.service";
import {ApiService} from "../api/api.service";
import {RouterOutlet} from "@angular/router";
import firebase from "firebase/compat";
import {timestamp} from "rxjs";
import * as moment from "moment/moment";


@Injectable({
    providedIn: 'root'
})
export class FeedService {


    private _correntUser: User;
    private _feedList: Feed[] = [];
    private _userType = "A";


    get correntUser(): User {
        return this._correntUser;
    }

    set correntUser(value: User) {
        this._correntUser = value;
    }

    get feedList(): Feed[] {
        return this._feedList;
    }

    set feedList(value: Feed[]) {
        this._feedList = value;
    }

    get userType(): string {
        return this._userType;
    }

    set userType(value: string) {
        this._userType = value;
    }

    get feed(): Feed {
        return this._feed;
    }

    set feed(value: Feed) {
        this._feed = value;
    }

    get authService(): AuthService {
        return this._authService;
    }

    private _feed: Feed = {
        kompania: "kompanai",
        vendodhja: "location",
        id: "id",
        userName: "username",
        tittle: "tittle",
        pershkrim: "decr",
        time: moment(new Date()),
        userType: "type"
    };

    constructor(private _authService: AuthService, private apiService: ApiService) {


    }

    setSpecialistFeeds() {
        console.log(this._userType)
        return this.apiService.filterFeedData('F');
        //     .subscribe(list => {
        //     console.log(list, "lista s")
        //     this._feedList = list;
        //     console.log(this._feedList, "lista s s")
        //
        //
        // });
    }

    setClientFeeds() {
        console.log(this._userType)

        return this.apiService.filterFeedData('P');
        //     .subscribe((list) => {
        //     console.log(list, "lista p")
        //     this._feedList = list;
        //     console.log(this._feedList, "lista p p")
        //
        // });


    }


    addFeed(feed: Feed) {
        this.apiService.addFeed(feed).then(r => {
        });
    }

    updateFeedFieldById(id: string, pFeed: Partial<Feed>) {
        this.apiService.updateFeedFieldById(id, pFeed).then(r => {
        });
    }

    deleteFeed(id: string) {
        this.apiService.deleteFeed(id).then(r => {
        });

    }

    covertDate(date) {


        return moment(date.toDate());

    }

    getCurrentUser() {
        return this.authService.getCurrentUser();
    }
}

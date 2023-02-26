import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from "../../../services/feed-service/feed.service";
import {Feed} from "../../../model/feed/feed.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-all-feeds',
    templateUrl: './all-feeds.page.html',
    styleUrls: ['./all-feeds.page.scss'],
})
export class AllFeedsPage implements OnInit {
    @Input() userType: string="";

    validUserType: boolean=true;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.userType = this.route.snapshot.paramMap.get('user-type');

        if (this.userType.length>0&&this.userType=="F"||this.userType=="P"){
            this.validUserType=true
        }
        else {
            this.validUserType=false

        }
    }


}

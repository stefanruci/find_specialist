import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Feed} from "../../model/feed/feed.model";
import {ApiService} from "../../services/api/api.service";

@Component({
    selector: 'app-feed-update-modal',
    templateUrl: './feed-update-modal.page.html',
    styleUrls: ['./feed-update-modal.page.scss'],
})
export class FeedUpdateModalPage implements OnInit {
    @Input() feed: Feed;

    constructor(private modalController: ModalController, private apiService: ApiService) {
    }

    dismiss() {
        this.modalController.dismiss().then(r => {
        });
    }

    updateFeed() {
        this.apiService.updateFeedFieldById(this.feed.id, this.feed)
        // Code to update the feed info goes here
        this.dismiss();
    }

    ngOnInit(): void {
    }

}

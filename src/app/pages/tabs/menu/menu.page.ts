import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "@firebase/util";
import {AlertController, IonContent, MenuController, ModalController, PopoverController} from "@ionic/angular";
import {map} from "rxjs";
import {User} from "src/app/model/user/user.model";
import {AuthService} from "src/app/services/auth/auth.service";
import {Feed} from "../../../model/feed/feed.model";
import {ApiService} from "../../../services/api/api.service";
import {FeedUpdateModalPage} from "../../feed-update-modal/feed-update-modal.page";
import {alert} from "ionicons/icons";
import {RouterService} from "../../../services/routerService/router.service";
import * as moment from "moment/moment";
import {AddFeedComponent} from "../../../components/add-feed/add-feed.component";


@Component({
    selector: "app-menu",
    templateUrl: "./menu.page.html",
    styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
    isCollapsed = true;
    @ViewChild("popover") popover: PopoverController;

    name: string = "Afrim";
    @ViewChild(IonContent) content: IonContent;
    editableFeed: Feed;
    private passMatch: boolean;

    constructor(
        private routerService: RouterService,
        private alertController: AlertController,
        private modalController: ModalController,
        private apiService: ApiService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private menuController: MenuController,
        private modalCtrl: ModalController,
    ) {
        this.load();

    }

    user: { profilePictureUrl: string; lastName: string; password: string; name: string; location: string; id: string; userType: string; email: string; username: string; pershkrim: string } = {
        id: "",
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        userType: "",
        location: "",
        profilePictureUrl: "",
        pershkrim: '',
    };
    myFeeds: Feed[] = [];
    isSaveButtonDisabled: boolean = false;
    partialUserPersonalInfo: Partial<User> = {
        id: "",
        name: "",
        lastName: "",
        username: "",
        email: "",
        userType: "",
        location: "",
        profilePictureUrl: "",
        pershkrim: ''
    }
    currentPass: string;
    newPass: string;
    retypedPass: string;
    isChangeButtonDisabled: boolean = false;
    isDeleted: boolean = false;

    ngOnInit() {

    }

    setMyFeeds() {
        this.apiService.filterFeedData(this.user.userType).subscribe((feeds) => {
            this.myFeeds = feeds.filter(feed => feed.userName === this.user.username);
        })
        console.log(this.myFeeds);

    }

    async logout() {
        try {
            console.log("logout");

            await this.authService.logout().then((e) => {
                this.routerService.navigate("/login");
                // this.router.navigateByUrl("/login", {replaceUrl: true});
            });
            await this.popover.dismiss();
            // this.chatService.currentUserId = null;
        } catch (e) {
            console.log(e);
        }
    }

    scrollToElement(id: string) {
        // const yOffset = document.getElementById(id).offsetTop;
        // this.content.scrollToPoint(0, yOffset, 1000);
        let section = document.getElementById(id);
        this.menuController.close("myMenu").then(r => {
            section.scrollIntoView();
        });


    }

    async editFeed(feed: Feed) {
        this.editableFeed = feed;
        const modal = await this.modalController.create({
            component: FeedUpdateModalPage,
            componentProps: {
                feed: feed,
            },
        });
        await modal.present();
    }


    onFeedClick(feed
                    :
                    Feed
    ) {

    }


    setUser() {
        this.authService.getCurrentUser().subscribe(
            (user) => {
                if (user) {
                    console.log(user)
                    this.user = user;
                    this.partialUserPersonalInfo.name = user.name;
                    this.partialUserPersonalInfo.id = user.id;
                    this.partialUserPersonalInfo.location = user.location;
                    this.partialUserPersonalInfo.lastName = user.lastName;
                    this.partialUserPersonalInfo.email = user.email;
                    this.partialUserPersonalInfo.profilePictureUrl = user.profilePictureUrl;
                    this.partialUserPersonalInfo.username = user.username;
                    this.partialUserPersonalInfo.userType = user.userType;
                    this.partialUserPersonalInfo.pershkrim = user.pershkrim;
                    console.log(this.partialUserPersonalInfo)
                }
            });
    }


    load() {
        this.setUser();
        setTimeout(() => {
            // your code here
            this.setMyFeeds();

        }, 1000);

    }


    saveInfo() {

        this.apiService.updateUser(this.partialUserPersonalInfo.id, this.partialUserPersonalInfo).then(r => {
            this.isSaveButtonDisabled = true;
        });
        this.load();
    }

    editInfo() {
        this.isSaveButtonDisabled = false;

    }

    changePass() {
        if (this.passMatch) {
            this.authService.changePass(this.newPass).then(res => {
                this.isChangeButtonDisabled = false;
                this.showAlert("Pass changed")
            });
        }


    }

    changePassButton() {
        this.isChangeButtonDisabled = true;
    }

    async showAlert(msg) {
        const alert = await this.alertController.create({
            header: "Alert?",
            cssClass: "custom-alert",
            message: msg,
            buttons: ["OK"],
        });
        await alert.present();
    }

    deleteAccount() {
        this.authService.deleteAccount(this.user).then(r => this.isDeleted = false);
    }

    deleteAccountP1() {
        this.isDeleted = true;
    }

    async openAddFeedModal() {
        const modal = await this.modalCtrl.create({
            component: AddFeedComponent,
            cssClass: "modal-medium",
        });
        return await modal.present();
    }

    covertDate(date: any) {
        return moment(date.toDate()).format("DD/MM");

    }
}

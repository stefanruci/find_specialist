import {Component, OnInit, ViewChild} from "@angular/core";

import {AlertController, IonContent, MenuController, ModalController, PopoverController} from "@ionic/angular";
import {User} from "src/app/model/user/user.model";
import {AuthService} from "src/app/services/auth/auth.service";
import {Feed} from "../../../model/feed/feed.model";
import {ApiService} from "../../../services/api/api.service";
import {FeedUpdateModalPage} from "../../feed-update-modal/feed-update-modal.page";
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
        private apiService: ApiService,
        private authService: AuthService,
        private menuController: MenuController,
        private modalCtrl: ModalController,
    ) {

    }

    user: User = {
        email: "",
        id: "",
        lastName: "",
        location: "",
        name: "",
        password: "",
        pershkrim: "",
        profilePictureUrl: "",
        userType: "",
        username: ""

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
    userLoaded: boolean = false;

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(
            (user) => {
                this.user = user.data();
                console.log(this.user)
                this.userLoaded = true;
                this.partialUserPersonalInfo.id = user.data().id;
                this.partialUserPersonalInfo.userType = user.data().userType;
                this.partialUserPersonalInfo.username = user.data().username;
                this.partialUserPersonalInfo.profilePictureUrl = user.data().profilePictureUrl;
                this.partialUserPersonalInfo.email = user.data().email;
                this.partialUserPersonalInfo.name = user.data().name;
                this.partialUserPersonalInfo.pershkrim = user.data().pershkrim;
                this.partialUserPersonalInfo.lastName = user.data().lastName;
                this.partialUserPersonalInfo.location = user.data().location;

            });

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
        const modal = await this.modalCtrl.create({
            component: FeedUpdateModalPage,
            componentProps: {
                feed: feed,
            },
        });
        await modal.present();
    }


    onFeedClick(feed: Feed) {
        console.log("cliicked")
        return this.routerService.navigate("tabs/all-feeds/feed-details/" + feed.id);

    }


    setUser() {

        this.authService._uid.subscribe(s => {
            console.log(s,"menu")

        })

        return this.authService.getCurrentUser().subscribe(
            (user) => {
                this.user = user.data();
                console.log(this.user)


            });

    }


    saveInfo() {

        this.apiService.updateUser(this.partialUserPersonalInfo.id, this.partialUserPersonalInfo).then(r => {
            this.isSaveButtonDisabled = true;
        });
        this.setUser()
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
        return moment(date.toDate());

    }

    getUsername() {


        return new Promise<string>((resolve, reject) => {
            if (this.user && this.user.username) {
                resolve(this.user.username);
            } else {
                reject(new Error('User type not available.'));
            }
        });
    }


    async getUserType(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (this.user && this.user.userType) {
                resolve(this.user.userType);
            } else {
                reject(new Error('User type not available.'));
            }
        });
    }
}





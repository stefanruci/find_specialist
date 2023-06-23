import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ModalController, Platform, PopoverController} from "@ionic/angular";

import {AuthService} from "../../../services/auth/auth.service";
import {RouterService} from "../../../services/routerService/router.service";
import {AddFeedComponent} from "../../../components/add-feed/add-feed.component";
import {User} from "../../../model/user/user.model";
import {finalize, Observable} from "rxjs";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.page.html',
    styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 3,
        autoplay: true,
        loop: true,
    };
    @ViewChild("popover") popover: PopoverController;


    banners: any[] = [];
    isLogin: boolean = false;
    userType: string;
    userId: string = "";
    dataLoaded: boolean = false;
    private currentUser: User = {
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

    constructor(
        private modalCtrl: ModalController,
        public authService: AuthService,
        private routerService: RouterService,
        private platform: Platform,
        public loadingCtrl: LoadingController,
    ) {


    }

    async showSpinner() {
        const spinner = await this.loadingCtrl.create({
            message: 'Please wait...', // Customize the message displayed with the spinner
            spinner: 'circles',// Customize the type of spinner displayed
        });
        await spinner.present();
    }

    ngOnInit() {

        this.loadData();


        if (this.platform.width() <= 700) {
            this.slideOpts.slidesPerView = 1;
        }
        this.banners = [
            {banner: "./assets/imgs/slider-imgs/1.png"},
            {banner: "./assets/imgs/slider-imgs/2.png"},
            {banner: "./assets/imgs/slider-imgs/3.png"},
            {banner: "./assets/imgs/slider-imgs/4.png"},
            {banner: "./assets/imgs/slider-imgs/5.png"},
            {banner: "./assets/imgs/slider-imgs/6.png"},
            {banner: "./assets/imgs/slider-imgs/7.png"},
        ];

    }


    async logout() {
        console.log("logout");
        await this.authService.logout().then((e) => {
            this.routerService.navigate("/login");
            this.popover.dismiss();
        });
        console.log("logged out", this.authService.isLogin);
    }


    async openAddFeedModal() {
        const modal = await this.modalCtrl.create({
            component: AddFeedComponent,
            cssClass: "modal-medium",
        });
        return await modal.present();
    }

    seAll(usertype: string) {

    }


    private loadData() {
        setTimeout(() => {
            this.isLogin = this.authService.isLogin;
            this.userType = this.authService.userType;
            console.log('enter in auth ', this.isLogin)
            console.log('out in auth ', this.isLogin)
        }, 1000)
        setTimeout(() => {

                this.dataLoaded = true;

        }, 1000)

    }


}

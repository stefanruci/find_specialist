import {
    AfterContentChecked,
    Component,
    OnInit,
    ViewChild,
} from "@angular/core";
import {Router} from "@angular/router";
import {ModalController, Platform, PopoverController} from "@ionic/angular";
import {LoginComponent} from "src/app/components/login/login.component";
import {AuthService} from "src/app/services/auth/auth.service";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
    Zoom,
    Autoplay,
    Thumbs,
    Controller,
    SwiperOptions,
} from "swiper";
import {AddFeedComponent} from "../../../components/add-feed/add-feed.component";

SwiperCore.use([
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
    Zoom,
    Autoplay,
    Thumbs,
    Controller,
]);

@Component({
    selector: "app-home",
    templateUrl: "./home.page.html",
    styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit, AfterContentChecked {
    slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 3,
        autoplay: true,
        loop: true,
    };
    @ViewChild("popover") popover: PopoverController;

    bannerConfig: SwiperOptions;
    banners: any[] = [];
    store_types: any[] = [];
    // bannerConfig: SwiperOptions;

    isLogin: boolean = false;
    userType: string;

    constructor(
        private modalCtrl: ModalController,
        public auth: AuthService,
        private router: Router,
        private platform: Platform
    ) {
    }

    // async openModal() {
    //   const modal = await this.modalCtrl.create({
    //     component: LoginComponent,
    //     cssClass: "modal-large",
    //   });
    //   return await modal.present();
    // }

    ngOnInit() {
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
        this.isLogin = this.auth.isLogin;
        this.userType = this.auth.userType;
    }

    ngAfterContentChecked() {
        this.bannerConfig = {
            slidesPerView: 1.2,
            spaceBetween: 30,
            centeredSlides: true,
        };
    }

    async logout() {
        console.log("logout");
        await this.auth.logout().then((e) => {

            this.router.navigateByUrl("/tabs/home", {replaceUrl: true});
            this.popover.dismiss();
        });
        console.log("loget uou", this.auth.isLogin);
    }


    async openAddFeedModal() {
        const modal = await this.modalCtrl.create({
            component: AddFeedComponent,
            cssClass: "modal-medium",
        });
        return await modal.present();
    }
}

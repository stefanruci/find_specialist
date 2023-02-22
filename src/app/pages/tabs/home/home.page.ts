import {
    AfterContentChecked,
    Component,
    OnInit,
    ViewChild,
} from "@angular/core";
import {ActivationStart, Router, RouterOutlet} from "@angular/router";
import {IonRouterOutlet, ModalController, Platform, PopoverController} from "@ionic/angular";
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
import {RouterService} from "../../../services/routerService/router.service";
import {FeedService} from "../../../services/feed-service/feed.service";

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
export class HomePage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 3,
        autoplay: true,
        loop: true,
    };
    @ViewChild("popover") popover: PopoverController;
    @ViewChild(IonRouterOutlet) outlet: IonRouterOutlet;
    @ViewChild(RouterOutlet) ngoOutlet: RouterOutlet;


    bannerConfig: SwiperOptions;
    banners: any[] = [];


    isLogin: boolean = false;
    userType: string;

    constructor(
        private modalCtrl: ModalController,
        public auth: AuthService,
        private routerService: RouterService,
        private platform: Platform,
        private router: Router,
    ) {
    }


    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.outlet.deactivate();
        });

        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
                this.ngoOutlet.deactivate();
        });

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


    async logout() {
        console.log("logout");
        await this.auth.logout().then((e) => {
            this.routerService.navigate("/login");
            this.popover.dismiss();
        });
        console.log("logged out", this.auth.isLogin);
    }


    async openAddFeedModal() {
        const modal = await this.modalCtrl.create({
            component: AddFeedComponent,
            cssClass: "modal-medium",
        });
        return await modal.present();
    }

    seAll(usertype: string) {
        //
        // this.routerService.navigateWithData(["/",'tabs',''], usertype).then(r => {
        // })
    }
}

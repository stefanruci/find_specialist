import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, Platform, PopoverController } from "@ionic/angular";
import { LoginComponent } from "src/app/components/login/login.component";
import { AuthService } from "src/app/services/auth/auth.service";
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
  constructor(
    private modalCtrl: ModalController,
    public auth: AuthService,
    private router: Router,
    private platform: Platform
  ) {}

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
      { banner: "./assets/imgs/slider-imgs/1.png" },
      { banner: "./assets/imgs/slider-imgs/2.png" },
      { banner: "./assets/imgs/slider-imgs/3.png" },
      { banner: "./assets/imgs/slider-imgs/4.png" },
      { banner: "./assets/imgs/slider-imgs/5.png" },
      { banner: "./assets/imgs/slider-imgs/6.png" },
      { banner: "./assets/imgs/slider-imgs/7.png" },
    ];
    this.isLogin = this.auth.isLogin;
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
      this.router.navigateByUrl("/login", { replaceUrl: true });
    });
    console.log("loget uou", this.auth.isLogin);
  }
}

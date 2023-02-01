import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LoginComponent } from "src/app/login/login.component";
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
  bannerConfig: SwiperOptions;
  banners: any[] = [];
  store_types: any[] = [];
  // bannerConfig: SwiperOptions;
  constructor(
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: "modal-large",
    });
    return await modal.present();
  }

  ngOnInit() {
    this.banners = [
      { banner: "./assets/imgs/slider-imgs/1.png" },
      { banner: "./assets/imgs/slider-imgs/2.png" },
      { banner: "./assets/imgs/slider-imgs/3.png" },
      { banner: "./assets/imgs/slider-imgs/4.png" },
      { banner: "./assets/imgs/slider-imgs/5.png" },
      { banner: "./assets/imgs/slider-imgs/6.png" },
      { banner: "./assets/imgs/slider-imgs/7.png" },
    ];
  }
  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
    };
  }
}

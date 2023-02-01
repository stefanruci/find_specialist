import { AfterContentChecked, Component, OnInit } from "@angular/core";
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
  // bannerConfig: SwiperOptions;
  banners: any[] = [];
  constructor(private modalCtrl: ModalController) {}

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
  ngAfterContentChecked(): void {
  }
}

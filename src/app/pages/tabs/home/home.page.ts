import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/login/login.component';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,AfterContentChecked {
  bannerConfig:SwiperOptions;
banners:any[]=[];
  constructor(private modalCtrl: ModalController) { }

async openModal() {
  const modal = await this.modalCtrl.create({
    component: LoginComponent,
    cssClass: 'modal-large'
  });
  return await modal.present();
}

  ngOnInit() {
    this.banners=[
      {banner:'url'},
     {banner:'src'},
      {banner:'src'},
      {banner:'src'},
      {banner:'src'},

    ];
  }
    ngAfterContentChecked(): void {
this.bannerConfig={
  slidesPerView:1.2,
  spaceBetween:10,
    centeredSlides:true,
}  }


}

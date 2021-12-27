import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';

import Swiper from 'swiper';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCards]);

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  did_tutorial = false;
  private slides: Swiper;

  /*config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };*/

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    public menu: MenuController,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {

    //this.startApp();

  }

  startApp() {
    this.did_tutorial = JSON.parse(localStorage.getItem('ion_did_tutorial'));
    
      if (this.did_tutorial || this.did_tutorial  != null) {
        localStorage.setItem('ion_did_tutorial',JSON.stringify(true));
        this.menu.enable(true);
        this.router.navigateByUrl('/tabs/tab1');
      } 
      else {
        this.router.navigateByUrl('/tutorial');
      }
  }

  setSwiperInstance(swiper: Swiper) {
    this.slides = swiper;
  }

  onSlideChangeStart() {
    this.showSkip = !this.slides.isEnd;
    this.cd.detectChanges();
  }

  ionViewWillEnter() {
    //this.startApp();
    
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}

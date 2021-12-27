import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SettingsProvider } from './providers/settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  appPages = [
    {
      title: 'Arbeitsstunden',
      url: '/tabs/tab1',
      icon: 'journal'
    },
    {
      title: 'Wo steht mein Auto',
      url: '/tabs/tab2',
      icon: 'car'
    },
    {
      title: 'Kalendar',
      url: '/tabs/tab3',
      icon: 'calendar'
    }
    // {
    //   title: 'Speakers',
    //   url: '/app/tabs/speakers',
    //   icon: 'people'
    // },
    // {
    //   title: 'Map',
    //   url: '/app/tabs/map',
    //   icon: 'map'
    // },
    // {
    //   title: 'About',
    //   url: '/app/tabs/about',
    //   icon: 'information-circle'
    // }
  ];

  dark;
  did_tutorial;
  constructor(private menu: MenuController, private platform: Platform, private router: Router, private settings: SettingsProvider) {
    this.dark = JSON.parse(localStorage.getItem('dark_mode'));
    console.log(this.dark);
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    this.openTutorial();
    // this.dark = JSON.parse(localStorage.getItem('dark_mode'));
    // this.onClick(null);
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      //this.splashScreen.hide();
      this.openTutorial();
      this.dark = JSON.parse(localStorage.getItem('dark_mode'));
      this.onClick(this.dark);
      console.log(this.dark);
    });
  }

  /**
   * Changes Theme to darkmode
   * @param event 
   */
  onClick(event) {
 
    if (event.detail.checked) {
      localStorage.setItem('dark_mode',JSON.stringify(true));
      document.body.setAttribute('data-theme', 'dark');
    }
    else {
      localStorage.setItem('dark_mode',JSON.stringify(false));
      document.body.setAttribute('data-theme', 'light');
    }
    this.dark = JSON.parse(localStorage.getItem('dark_mode'));
  }

  openTutorial() {
    this.menu.enable(false);
    //this.storage.set('ion_did_tutorial', false);

    //this.pauseTime = JSON.parse(localStorage.getItem('pauseTime'));
    this.did_tutorial = JSON.parse(localStorage.getItem('ion_did_tutorial'));
    if(this.did_tutorial != false && this.did_tutorial != null ){
      localStorage.setItem('ion_did_tutorial',JSON.stringify(true));
      this.router.navigateByUrl('/tabs/tab1');
    }
    else if(this.did_tutorial == null){
      localStorage.setItem('ion_did_tutorial',JSON.stringify(false));
      this.router.navigateByUrl('/tutorial');
    }
  }
}

import { Component, ElementRef, OnInit, QueryList, ViewChild, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { IonContent, IonList } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, MenuController, Platform , ModalController} from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-modal-timer',
  templateUrl: 'modal-timer.page.html',
  styleUrls: ['modal-timer.page.scss'],
})
export class ModalTimerPage implements OnInit {

  public time ;


  

  opts = {
    freeMode: true,
    slidesPerView: 2.8,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  constructor(private router: Router, private toastCtrl: ToastController, private route: ActivatedRoute, private modalCtrl: ModalController, private navParams: NavParams) { 

  }

  ngOnInit() {
    this.time = JSON.parse(localStorage.getItem('pauseTime'));
    if(this.time == null){
      this.time ="00:30";
      localStorage.setItem('pauseTime',JSON.stringify(this.time));
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    var time = this.time.split('T')[1].split('+')[0].split('.')[0].slice(0, -3);
    console.log(time);
    this.modalCtrl.dismiss({time: time});
  }

  ionViewWillEnter(){
  }

  ionViewWillLeave(){
  }

  updateTime($event) {
    console.log($event.split('T')[1].split('+')[0].split('.')[0].slice(0, -3));
    this.time = $event;
  }

}

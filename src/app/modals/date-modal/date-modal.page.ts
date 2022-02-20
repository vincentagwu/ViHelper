import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController,PopoverController  } from '@ionic/angular';
import {format, parseISO} from 'date-fns';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.page.html',
  styleUrls: ['./date-modal.page.scss'],
})
export class DateModalPage implements OnInit {
  time;
  //dateValue = format(new Date(), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';
  dateValue;

  showTimePicker = false;

  constructor(private modalCtrl: ModalController) { 
    
  }

  ngOnInit() {
    //this.setToday();
    console.log("time: " + this.time);
    console.log("dateValue: " + this.dateValue);
    this.dateValue.setHours(new Date().getHours()-1);
    console.log("dateValue: " + this.dateValue);
    var date = format(new Date(this.dateValue), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';
    this.dateValue = date;
    //this.time = date;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() { 
    this.modalCtrl.dismiss({date: this.dateValue})
  }

  setToday(){
    this.time = format(new Date(), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';
  }


  async closeModal() {
    await this.modalCtrl.dismiss();
  }


  updateTime(value) {
    this.dateValue = value;
    //this.time = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    //this.startTime = value;
    this.showTimePicker = false;
  }

}

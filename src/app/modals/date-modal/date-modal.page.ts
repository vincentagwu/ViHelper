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
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';

  showTimePicker = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.setToday();
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
    this.time = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    //this.startTime = value;
    this.showTimePicker = false;
  }

}

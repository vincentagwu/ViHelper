import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController,PopoverController  } from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {format, parseISO,} from 'date-fns';
import {utcToZonedTime} from  'date-fns-tz'
import { DateModalPage } from '../date-modal/date-modal.page';

@Component({
  selector: 'app-cal-modal',
  templateUrl: 'cal-modal.page.html',
  styleUrls: ['cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {

  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  titleHeader: string;
  pauseTime;
  viewTitle: string;
  title: string;
  desc: string;
  //startTime = format(new Date(), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';
  //endTime = format(new Date(), 'yyyy-MM-dd') + 'T' + (new Date(new Date().getTime())).toLocaleTimeString().toString() + '.000Z';
  startTime ;
  endTime;

  dateStartValue ;
  dateEndValue ;

  showStartTimePicker = false;
  showEndTimePicker = false;

  location = 'madison';

  selectOptions = {
    header: 'Select a Location'
  };

  event = {
    title: '',
    desc: '',
    startTime: new Date(),
    endTime: new Date(),
    pauseTime:'',
    allDay: true
  };
  
 
  modalReady = false;
 
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController,  public router: Router,) {
    this.dateStartValue = this.startTime;
    this.dateEndValue = this.endTime;
   }
 
  ngOnInit() {
   
    this.setToday();
    this.showStartTimePicker = false;
    this.showEndTimePicker = false;
    this.pauseTime = JSON.parse(localStorage.getItem('pauseTime'));
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }

  setToday(){
    this.startTime =format(parseISO(format(new Date(this.startTime), 'yyyy-MM-dd')), new Date(this.startTime).getHours() + ':'+ (new Date(this.startTime).getMinutes().toLocaleString().length > 1 ? new Date(this.startTime).getMinutes() : '0' + new Date(this.startTime).getMinutes() )+ ', MMM d, yyyy');
    this.endTime =format(parseISO(format(new Date(this.endTime), 'yyyy-MM-dd')), new Date(this.endTime).getHours() + ':'+ (new Date(this.endTime).getMinutes().toLocaleString().length > 1 ? new Date(this.endTime).getMinutes() : '0' + new Date(this.endTime).getMinutes() )+ ', MMM d, yyyy');
  }
 
 
  updateStartTime(value) {
    this.dateStartValue = value;
    this.startTime = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    //this.startTime = value;
    this.showStartTimePicker = false;
  }

  updateEndTime(value) {
    this.dateEndValue = value;
    this.endTime = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    //this.startTime = value;
    this.showEndTimePicker = false;
  }

  save() { 
    var startTime = new Date(this.dateStartValue);
    var endTime = new Date(this.dateEndValue);
    
    this.event.title = this.title;
    this.event.desc = this.desc;
    this.event.startTime = startTime;
    this.event.endTime = endTime;
    this.event.pauseTime = this.pauseTime;
    this.event.allDay = true;

    if(new Date( this.event.endTime).getTime() < new Date( this.event.startTime).getTime()){
      if(this.title == 'Schichtdaten')
        this.presentAlert('Bitte Ende der Schicht ändern!', 'Ende der Schicht ändern', 'Du hast beim Ende der Schicht ein Datum gewählt, welches vor dem Start der Schicht stattfindet!');
      else
        this.presentAlert('Bitte Ende der Termin ändern!', 'Ende der Termin ändern', 'Du hast beim Ende der Termin ein Datum gewählt, welches vor dem Start der Termin stattfindet!');

    }
    else if((new Date(this.event.endTime).getDate() > new Date(this.event.startTime).getDate()) && (new Date(this.event.endTime).getMonth() >= (new Date(this.event.startTime).getMonth()) && (new Date(this.event.endTime).getFullYear() >= (new Date(this.event.startTime).getFullYear())))){
      if(this.title == 'Schichtdaten')
        this.presentAlert('Okay?!', 'Workaholic?!', 'Hoppla, was ist den hier los?! Ich meine mich zu erinnern, dass du nur Schichten in einem Tag hast?!');
      else
        this.presentAlert('Okay?!', 'Die Partymachende Caro?!', 'Hoppla, was ist den hier los?! Ich meine mich zu erinnern, dass du nur Schichten in einem Tag hast?!');
    }
    else if(this.title == '' || this.title == undefined){
      if(this.title == 'Schichtdaten')
        this.presentAlert('Bitte Haupttätigkeit eingetragen!', 'Haupttätigkeit leer', 'Du hast die Haupttätigkeit leer gelassen!');
      else
      this.presentAlert('Bitte Terminnamen eingetragen!', 'Terminname leer', 'Du hast den Terminnamen leer gelassen!');
    }
    else if(new Date( this.event.startTime).getTime() ==  new Date( this.event.endTime).getTime()){
      if(this.title == 'Schichtdaten')
        this.presentAlert('For real?!!', 'Schicht nicht gespeichert', 'Es macht keinen Sinn so eine kurze Schicht einzutragen!');
      else
        this.presentAlert('For real?!!', 'Termin nicht gespeichert', 'Es macht keinen Sinn so einen kurzen Termin einzutragen!');
    }
    else if(new Date( this.event.startTime).getTime() <  new Date( this.event.endTime).getTime()){
      if(this.title == 'Schichtdaten')
        this.presentAlert('Schicht erfolgreich eingetragen!', 'Schicht gespeichert', 'Du hast die Schicht am ' + + startTime.getUTCDate() + ' erfolgreich eingetragen!');
      else
        this.presentAlert('Termin erfolgreich eingetragen!', 'Termin gespeichert', 'Du hast den Termin am ' + + startTime.getUTCDate() + ' erfolgreich eingetragen!');

      this.modalCtrl.dismiss({event: this.event})
    }
    console.log(this.event);
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  insertTitle($event) {
    this.title = $event.target.value;
  }

  insertDesc($event) {
    this.desc = $event.target.value;
  }

  insertStartTime($event) {
    this.startTime = $event.target.value;
  }



  insertEndTime() {
    this.endTime = moment().subtract(50, 'minute').format();
  }
 
  close() {
    this.modalCtrl.dismiss();
  }

  async openEndDateModal() {
    const modal = await this.modalCtrl.create({
      component: DateModalPage,
      cssClass: 'date-modal',
      swipeToClose: true,
      componentProps: {
        dateValue: this.dateStartValue,
        time: this.dateStartValue
      },
      presentingElement: await this.modalCtrl.getTop()
    });


    await modal.present();
   
    await modal.onDidDismiss().then((result) => {
      console.log(result);
      if (result.data && result.data.date) {
        console.log(result.data.date);
        this.dateEndValue = result.data.date;
        this.endTime = format(parseISO(result.data.date), 'HH:mm, MMM d, yyyy');
        //this.startTime = value;
        this.showEndTimePicker = false;
      }
    });
  }

  async openStartDateModal() {
    const modal = await this.modalCtrl.create({
      component: DateModalPage,
      cssClass: 'date-modal',
      swipeToClose: true,
      componentProps: {
        dateValue: this.dateStartValue,
        time: this.dateStartValue
      },
      presentingElement: await this.modalCtrl.getTop()
    });


    await modal.present();
   
    await modal.onDidDismiss().then((result) => {

      console.log(result.data);
      if (result.data && result.data.date) {
        this.dateStartValue = result.data.date;
        this.startTime = format(parseISO(result.data.date), 'HH:mm, MMM d, yyyy');
        //this.startTime = value;
        this.showStartTimePicker = false;
      }
    });
  }


  async presentAlert(header:string, subHeader:string, message:string ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

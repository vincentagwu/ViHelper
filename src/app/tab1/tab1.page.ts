import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from './../modals/cal-modal/cal-modal.page';
import { ModalTimerPage } from './../modals/modal-timer/modal-timer.page';
import { formatDate } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { timer, Observable } from 'rxjs';
import * as moment from "moment"; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ios: boolean;
  data: any;
  tempEvents = [];
  eventSource = [];
  newEvent: boolean = true;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  viewTitle;
  pauseTime = ['00:00', '00:30', '00:45'];
  did_tutorial ;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit() {
    this.startApp(); 
    this.loadEvents();
    //this.pauseTime = JSON.parse(localStorage.getItem('pauseTime'));
    this.data = JSON.parse(localStorage.getItem('shifts'));
    // if(data == null)
    //   localStorage.setItem('athleteData',JSON.stringify(user));
    this.ios = this.config.get('mode') === 'ios';

    console.log(this.pauseTime);
  }

  startApp() {
    this.did_tutorial = JSON.parse(localStorage.getItem('ion_did_tutorial'));
    if(this.did_tutorial == false || this.did_tutorial ==  null){
      localStorage.setItem('ion_did_tutorial',JSON.stringify(false));
      this.did_tutorial= false;
    }
      

      if (this.did_tutorial != false ) {
        this.menu.enable(true);
        this.router.navigateByUrl('/tabs/tab1');
      } 
      else {
        console.log("drin!")
        this.router.navigateByUrl('/tutorial');
      }
  }

  async loadEvents(){
    this.calendar.currentDate = new Date();
    this.data = JSON.parse(localStorage.getItem('shifts'));
    this.tempEvents =  this.data ;
    var events = [];
      
    
    await timer(300).subscribe(x => { 
      for (let event_ of this.tempEvents ) {
          events.push({
            title: event_.title,
            startTime : new Date(event_.startTime),
            endTime : new Date(event_.endTime),
            allDay: false,
          });
      }
    });

      await timer(300).subscribe(x => { 
       this.data = JSON.parse(localStorage.getItem('shifts'));
        this.eventSource = events;
        console.log(this.eventSource);
      });

  }

  async openCalModal() {
    let eventCopy = {
      title: "",
      startTime:  new Date(),
      endTime: new Date(),
      pauseTime: '',
      allDay: "true",
      desc: ""
    }

    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        titleHeader: 'Schichtdaten'
      },
    });
   
    await modal.present();
   
    await modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        console.log(event);
        

        eventCopy.title = result.data.event.title;
        eventCopy.desc = result.data.event.desc;
        eventCopy.allDay = result.data.event.allDay;
        eventCopy.startTime = new Date(
          new Date(result.data.event.startTime).getFullYear(),
          new Date(result.data.event.startTime).getMonth(),
          new Date(result.data.event.startTime).getDate(),
          new Date(result.data.event.startTime).getHours(),
          new Date(result.data.event.startTime).getMinutes(),
          0,
          0
        );

        let shiftTimeDecimalBrutto = (((event.endTime - event.startTime)/3.6e+6));

        if(shiftTimeDecimalBrutto < 6){
          eventCopy.pauseTime = this.pauseTime[0];
        }
        else if(shiftTimeDecimalBrutto > 6 && shiftTimeDecimalBrutto < 9){
          eventCopy.pauseTime = this.pauseTime[1];
        }
        else if(shiftTimeDecimalBrutto > 9){
          eventCopy.pauseTime = this.pauseTime[2];
        }
        eventCopy.endTime = new Date(
          new Date(result.data.event.endTime).getFullYear(),
          new Date(result.data.event.endTime).getMonth(),
          new Date(result.data.event.endTime).getDate(),
          new Date(result.data.event.endTime).getHours(),
          new Date(result.data.event.endTime).getMinutes(),
          0,
          0
        );

        timer(100).subscribe(x => { 

          for( var i = 0; i < this.eventSource.length; i++){ 

            if ( this.eventSource[i].startTime.toString().substring(4,15) === event.endTime.toString().substring(4,15)) { 
        
              this.eventSource.splice(i, 1); 
            }
        
          }
        });
        this.eventSource.push(eventCopy);
        localStorage.setItem('shifts',JSON.stringify(this.eventSource));
        this.data = JSON.parse(localStorage.getItem('shifts'));
        timer(500).subscribe(x => { 
          this.loadEvents();
          this.myCal.loadEvents();
        });
        localStorage.setItem('shifts',JSON.stringify(this.eventSource));
      }
    });
  }

  go(){
    this.router.navigate(['tab2']);
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
  
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
  
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
  async logPauseTime(){
    let eventCopy = {
      title: "",
      startTime:  new Date(),
      endTime: new Date(),
      pauseTime: '',
      allDay: "true",
      desc: ""
    }

    const modal = await this.modalCtrl.create({
      component: ModalTimerPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.time) {
        let pauseTime = result.data.time;
        console.log(pauseTime);
        this.pauseTime = pauseTime;
        localStorage.setItem('pauseTime',JSON.stringify(this.pauseTime));
        this.pauseTime = JSON.parse(localStorage.getItem('pauseTime'));
        var now = new Date();
        var nowDateTime = now.toISOString();
        console.log(nowDateTime);
        var nowDate = nowDateTime.split('T')[0];
        console.log(nowDate);
        var hms = this.pauseTime + ":00";
        console.log(hms);
        var target = new Date(nowDate+hms);
        console.log(target.getTime());
        timer(500).subscribe(x => { 
          this.loadEvents();
          this.myCal.loadEvents();
        });
      }
    });
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    var workHours = ((event.endTime - event.startTime)/3.6e+6)
    var pause;
    // if(event.pauseTime == "" || event.pauseTime == null)
    //   pause = this.pauseTime;
    // else
    //   pause = event.pauseTime;

      if(workHours <= 3){
        pause = this.pauseTime[0];
      }
      else if(workHours > 3 && workHours < 9){
        pause = this.pauseTime[1];
      }
      else if(workHours > 9){
        pause = this.pauseTime[2];
      }

    var pauseTime: number = parseInt(pause.substring(0,3)) * 60 + parseInt(pause.substring(3,5));
    var pauseTimeMinutes: number = parseInt(pause.substring(3,5));
    var pauseTimeDecimal = (parseInt(pause.substring(0,3)) + parseInt((pause.substring(3,5)))/60); //(parseInt(pause.substring(0,2)) + parseInt((pause.substring(3,5)))/3.6e+6);
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    var shiftTimeNettoHour:number = (new Date(event.endTime).getHours()  - new Date(event.startTime).getHours())/3.6e+6 ;
    var shiftTimeNettoMinutes:number = (new Date(event.endTime).getMinutes() - new Date(event.startTime).getMinutes()) / 3.6e+6;
    console.log(shiftTimeNettoHour);
    console.log(this.timeUnits(shiftTimeNettoHour ));
    let shiftTimeBruttoHour= new Date(event.endTime).getHours() - new Date(event.startTime).getHours();
    let shiftTimeBruttoMinutes= new Date(event.endTime).getMinutes() - new Date(event.startTime).getMinutes();
    let shiftTimeDecimalNetto = (((event.endTime - event.startTime)/3.6e+6) - pauseTimeDecimal).toFixed(2);
    let shiftTimeDecimalBrutto= (((event.endTime - event.startTime)/3.6e+6)).toFixed(2);
    let date = formatDate(new Date(), 'medium', this.locale);
   
    this.presentAlertCalendar('Schicht am '+ date.substring(0,12), event.desc, 
    'Schicht<br><br>Von: ' + start + '<br><br>Bis: ' + end + '<br><br>Dezimalansicht:<br><br>Arbeitszeit (netto): ' + shiftTimeDecimalNetto+ '<br>Pause: ' + pauseTimeDecimal.toFixed(2)  +'<br>Arbeitszeit (brutto): ' + shiftTimeDecimalBrutto
    , 
    true, 
    event);
    await timer(500).subscribe(x => { 
          //this.resetEvent();
      this.loadEvents();
      this.myCal.loadEvents();
     });
  }

  timeUnits( ms ) {
    if ( !Number.isInteger(ms) ) {
        return null
    }
    /**
     * Takes as many whole units from the time pool (ms) as possible
     * @param {int} msUnit - Size of a single unit in milliseconds
     * @return {int} Number of units taken from the time pool
     */
    const allocate = msUnit => {
        const units = Math.trunc(ms / msUnit)
        ms -= units * msUnit
        return units
    }
    // Property order is important here.
    // These arguments are the respective units in ms.
    return {
        // weeks: (604800000), // Uncomment for weeks
        days: allocate(86400000),
        hours: allocate(3600000),
        minutes: allocate(60000),
        seconds: allocate(1000),
        ms: ms // remainder
    }
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

  async presentAlertCalendar(header:string, subHeader:string, message:string, value:boolean, event ) {
    if(value){
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
            handler: () => {
              console.log('Schicht nicht abgebrochen');
            }
          },
          {
            text: 'Schicht löschen',
            handler: () => {
              //this.db.doc(`events/${event.id}`).delete();
              //this.eventService.deleteEvent(event._id);

              console.log(event.endTime.toString().substring(4,15));
              //this.tempEvents = this.eventSource;
              timer(100).subscribe(x => { 

                for( var i = 0; i < this.eventSource.length; i++){ 
    
                  if ( this.eventSource[i].startTime.toString().substring(4,15) === event.endTime.toString().substring(4,15)) { 
              
                      this.eventSource.splice(i, 1); 
                  }
              
              }
                
                console.log(this.eventSource);
                  // for (let event_ of this.eventSource) {
                    
                  //   if(event_.title == event.title ){
                  //     this.tempEvents = this.tempEvents.filter(event_ => event_ !== event);
                  //     console.log(this.tempEvents);
                  //   }
                  // }
                  localStorage.setItem('shifts',JSON.stringify(this.eventSource));
                  this.loadEvents();
              });
              this.presentAlert('Schicht löschen', '', 'Sie haben erfolgreich Ihren Schicht gelöscht!');
              console.log('Schicht gelöscht');
            }
          }
        ]
      });
      await alert.present();
    }
    else{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
          {
            text: 'Schließen',
            role: 'cancel',
            handler: () => {
              console.log('Schichtanzeige geschlossen');
            }
          }
        ]
      
    })
    
    await alert.present();
  }
}
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    // this.event.startTime = new Date(ev.selectedTime);
    selected.setHours(selected.getHours() + 1);
    // this.event.endTime = new Date(ev.selectedTime);
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

}

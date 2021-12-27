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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  ios: boolean;
  data: any;
  dates: any[] = [];
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
    
    this.loadEvents();
    //this.pauseTime = JSON.parse(localStorage.getItem('pauseTime'));
    this.data = JSON.parse(localStorage.getItem('appointments'));
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
    this.data = JSON.parse(localStorage.getItem('appointments'));
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
       this.data = JSON.parse(localStorage.getItem('appointments'));
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
        titleHeader: 'Termindaten'
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

        if(shiftTimeDecimalBrutto <= 3){
          eventCopy.pauseTime = this.pauseTime[0];
        }
        else if(shiftTimeDecimalBrutto > 3 && shiftTimeDecimalBrutto < 9){
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
        localStorage.setItem('appointments',JSON.stringify(this.eventSource));
        this.data = JSON.parse(localStorage.getItem('appointments'));
        timer(500).subscribe(x => { 
          this.loadEvents();
          this.myCal.loadEvents();
        });
        localStorage.setItem('appointments',JSON.stringify(this.eventSource));
      }
    });
  }

  close(){
    this.modalCtrl.dismiss();
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

    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    let date = formatDate(new Date(), 'medium', this.locale);
   
    this.presentAlertCalendar('Termin am '+ date.substring(0,12), 'Details: ' + event.desc, 
    'Termin<br><br>Von: ' + start + '<br><br>Bis: ' + end 
    , 
    true, 
    event);
    await timer(500).subscribe(x => { 
          //this.resetEvent();
      this.loadEvents();
      this.myCal.loadEvents();
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
              console.log('Termin nicht abgebrochen');
            }
          },
          {
            text: 'Termin löschen',
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
                  localStorage.setItem('appointments',JSON.stringify(this.eventSource));
                  this.loadEvents();
              });
              this.presentAlert('Termin löschen', '', 'Sie haben erfolgreich Ihren Termin gelöscht!');
              console.log('Termin gelöscht');
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
              console.log('Terminanzeige geschlossen');
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

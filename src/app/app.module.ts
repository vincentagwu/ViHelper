import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsProvider } from './providers/settings';
import { CommonModule } from '@angular/common'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ModalTimerPageModule } from './modals/modal-timer/modal-timer.module';
import { CalModalPageModule} from './modals/cal-modal/cal-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SwiperModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgCalendarModule,  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production
  }),ModalTimerPageModule, CalModalPageModule],
  providers: [SettingsProvider, Storage,Geolocation,NativeAudio,NativeGeocoder, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

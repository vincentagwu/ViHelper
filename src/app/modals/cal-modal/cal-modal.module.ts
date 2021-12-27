import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser'
import { CalModalPageRoutingModule } from './cal-modal-routing.module';

import { CalModalPage } from './cal-modal.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import {  HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    CalModalPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalModalPage]
})
export class CalModalPageModule {}

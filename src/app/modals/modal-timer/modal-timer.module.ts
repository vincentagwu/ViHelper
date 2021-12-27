import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTimerPageRoutingModule } from './modal-timer-routing.module';

import { ModalTimerPage } from './modal-timer.page';
import {  HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTimerPageRoutingModule
  ],
  declarations: [ModalTimerPage]
})
export class ModalTimerPageModule {}

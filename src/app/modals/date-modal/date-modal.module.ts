import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateModalPageRoutingModule } from './date-modal-routing.module';

import { DateModalPage } from './date-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateModalPageRoutingModule
  ],
  declarations: [DateModalPage]
})
export class DateModalPageModule {}

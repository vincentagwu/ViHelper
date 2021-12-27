import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateModalPage } from './date-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateModalPageRoutingModule {}

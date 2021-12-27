import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTimerPage } from './modal-timer.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTimerPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToernooiDetailPage } from './toernooi-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ToernooiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToernooiDetailPageRoutingModule {}

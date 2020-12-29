import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeelnemerDetailsPage } from './deelnemer-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeelnemerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeelnemerDetailsPageRoutingModule {}

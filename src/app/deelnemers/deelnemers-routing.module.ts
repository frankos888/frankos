import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeelnemersPage } from './deelnemers.page';

const routes: Routes = [
  {
    path: '',
    component: DeelnemersPage,
  },
  {
    path: ':deelnemerId',
    loadChildren: () => import('./deelnemer-details/deelnemer-details.module').then( m => m.DeelnemerDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeelnemersPageRoutingModule {}

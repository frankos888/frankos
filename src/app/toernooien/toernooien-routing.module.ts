import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToernooienPage } from './toernooien.page';

const routes: Routes = [
  {
    path: '',
    component: ToernooienPage,
  },
  {
    path: ':toernooiId',
    loadChildren: () => import('./toernooi-detail/toernooi-detail.module').then( m => m.ToernooiDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToernooienPageRoutingModule {}

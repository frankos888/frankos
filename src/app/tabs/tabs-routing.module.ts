import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'toernooien',
        loadChildren: () => import('../toernooien/toernooien.module').then(m => m.ToernooienPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'deelnemers',
        loadChildren: () => import('../deelnemers/deelnemers.module').then(m => m.DeelnemersPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/toernooien',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/toernooien',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

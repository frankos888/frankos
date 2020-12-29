import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToernooiDetailPageRoutingModule } from './toernooi-detail-routing.module';

import { ToernooiDetailPage } from './toernooi-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToernooiDetailPageRoutingModule
  ],
  declarations: [ToernooiDetailPage]
})
export class ToernooiDetailPageModule {}

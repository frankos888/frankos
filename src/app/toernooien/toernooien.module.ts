import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToernooienPage } from './toernooien.page';

import { ToernooienPageRoutingModule } from './toernooien-routing.module';
import { ToernooiComponent } from './toernooi/toernooi.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ToernooienPageRoutingModule
  ],
  declarations: [ToernooienPage, ToernooiComponent]
})
export class ToernooienPageModule {}

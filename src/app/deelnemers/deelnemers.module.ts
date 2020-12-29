import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeelnemersPage } from './deelnemers.page';

import { DeelnemersPageRoutingModule } from './deelnemers-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DeelnemersPageRoutingModule
  ],
  declarations: [DeelnemersPage]
})
export class DeelnemersPageModule {}

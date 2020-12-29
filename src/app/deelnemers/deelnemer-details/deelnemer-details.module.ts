import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeelnemerDetailsPageRoutingModule } from './deelnemer-details-routing.module';
import { DeelnemerDetailsPage } from './deelnemer-details.page';
import { ImagePickerComponent } from 'src/app/shared/image-picker/image-picker.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DeelnemerDetailsPageRoutingModule
   ],
  declarations: [DeelnemerDetailsPage, ImagePickerComponent]
})
export class DeelnemerDetailsPageModule {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Toernooi } from '../toernooien/toernooi.model';
import { ToernooienService } from '../toernooien/toernooien.service';
import { Deelnemer } from './deelnemer.model';
import { DeelnemersService } from './deelnemers.service';

@Component({
  selector: 'app-deelnemers',
  templateUrl: 'deelnemers.page.html',
  styleUrls: ['deelnemers.page.scss']
})
export class DeelnemersPage implements OnInit, OnDestroy{
 loadedDeelnemers: Deelnemer[];
 private deelnemersSub: Subscription;

 loadedToernooien: Toernooi[];

 constructor(private deelnemersService: DeelnemersService,
             private toernooienService: ToernooienService,
             private loadingCtrl: LoadingController) {}


ngOnInit() {
  this.deelnemersSub = this.deelnemersService.deelnemers.subscribe(deelnemersreturn => {
    this.loadedDeelnemers = deelnemersreturn
  });

  this.loadedToernooien = this.toernooienService.fetchToernooien();

}

ionViewWillEnter(){
  this.deelnemersService.fetchDeelnemers().subscribe(); 
}


onDeleteDeelnemer(deelnemerId: string, slidingEl: IonItemSliding ){

  slidingEl.close();
  console.log('delete deelnemer: ' + deelnemerId);
  this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
    loadingEl.present();
    this.deelnemersService.deleteDeelnemer(deelnemerId).subscribe(() => {
      loadingEl.dismiss();
    });
  });
}

ngOnDestroy(){

  if (this.deelnemersSub) {
    this.deelnemersSub.unsubscribe();
  }
}


}

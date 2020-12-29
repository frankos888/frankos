import { Component, OnInit } from '@angular/core';
import { Toernooi } from './toernooi.model';
import { ToernooienService } from './toernooien.service';


@Component({
  selector: 'app-toernooien',
  templateUrl: 'toernooien.page.html',
  styleUrls: ['toernooien.page.scss']
})
export class ToernooienPage implements OnInit {
 toernooien: Toernooi[];

 constructor(private toernooienService: ToernooienService) {}

 ngOnInit(){
   this.toernooien = this.toernooienService.fetchToernooien();
 }

}

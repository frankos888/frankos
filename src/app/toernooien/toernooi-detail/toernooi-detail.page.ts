import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toernooi } from '../toernooi.model';
import { ToernooienService } from '../toernooien.service';

@Component({
  selector: 'app-toernooi-detail',
  templateUrl: './toernooi-detail.page.html',
  styleUrls: ['./toernooi-detail.page.scss'],
})
export class ToernooiDetailPage implements OnInit {
  loadedToernooi: Toernooi;
    
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toernooienService: ToernooienService
              ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('toernooiId')) {
        // redirect
        this.router.navigate(['/toernooien']);
        return;
      }
      const toernooiId = paramMap.get('toernooiId');
      this.loadedToernooi = this.toernooienService.getToernooi(toernooiId);
    });
  
  
  
  
  
  
  }







  onDeleteToernooi(id: string){
  console.log('verwijder toernooi: ' + id);

 }

}

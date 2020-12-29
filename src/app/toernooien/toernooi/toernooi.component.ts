import { Component, OnInit, Input } from '@angular/core';
import { Toernooi } from '../toernooi.model';

@Component({
  selector: 'app-toernooi',
  templateUrl: './toernooi.component.html',
  styleUrls: ['./toernooi.component.scss'],
})
export class ToernooiComponent implements OnInit {
  @Input() toernooi: Toernooi;
  constructor() { }

  ngOnInit() {}

}

import { Injectable } from '@angular/core';
import { Toernooi } from './toernooi.model';


@Injectable({
    providedIn: 'root'
  })

export class ToernooienService{
 private toernooien: Toernooi[]=[
    {
      id: "T1",
      type: "Silat",
      title: "Silat Roermond 2020",
      description: "Pencak Silat Toernooi Roermond all klassen.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWsqs-lXC-hd6-8UDtHLjR729yNc0jmT9RYw&usqp=CAU",
      date: new Date(),
      location: "Blanksteeg 83 Roermond"   
    },
   {
     id: "T2",
     type: "Silat",
     title: "Silat Roermond 2019",
     description: "Pencak Silat Toernooi Roermond all klassen voor de Fun.",
     imageUrl: "https://coconuts.co/wp-content/uploads/2017/08/000_RS74T.jpg",
     date: new Date(),
     location: "Blanksteeg 83 Roermond"   
  }
  ];

  constructor() {}

  fetchToernooien() { 
    return [...this.toernooien];
  }

  getToernooi(toernooiId: string) {
    return {
      ...this.toernooien.find(toernooi=> {
        return toernooi.id === toernooiId;
      })
    };
  }


}
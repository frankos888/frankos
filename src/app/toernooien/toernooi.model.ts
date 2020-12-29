export class Toernooi {
    constructor(
      public id: string,
      public type: string,
      public title: string,
      public description: string,
      public imageUrl: string,
      public date: Date,   
      public location: string
    ) {}
  }
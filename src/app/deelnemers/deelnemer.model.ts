export class Deelnemer {
    constructor(
      public id: string,
      public name: string,
      public birthdate: Date,
      public weight: number,
      public imageUrl: string,
      public team: string,                //team info administred by Teams in menu.
      public location: string,            //address info
      public user_id: string              //user that created/updated deelnemer
    ) {}
  }
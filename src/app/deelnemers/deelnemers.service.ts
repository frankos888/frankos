import {BlobServiceClient, StorageSharedKeyCredential, BlobDownloadResponseModel} from "@azure/storage-blob";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import  { take, map, delay, tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Deelnemer } from './deelnemer.model';
import { stringify } from "@angular/compiler/src/util";

// {
//   id:        "d1",
//   name:      "Harry Denktank",
//   birthdate: new Date(),
//   weight:     50.2,
//   imageUrl:   `https://frankresourcegroupdiag.blob.core.windows.net/files/fotodeelnemer_001.jpg${environment.azureBlobAPIKey}`,
//   team:       "Venlo Silat Team",
//   location:   "Dwazehenkenstraat 44 Venlo",
//   user_id:    "user_001"
// },
// {
//   id:        "d2",
//   name:      "Wily vechtaap",
//   birthdate: new Date(),
//   weight:     100.7,
//   imageUrl:   `https://frankresourcegroupdiag.blob.core.windows.net/files/fotodeelnemer_002.jpg${environment.azureBlobAPIKey}`,
//   team:       "Roermond Silat Team",
//   location:   "Hankiedetankie 38 Roermond",
//   user_id:    "user_002"
// }



// Data zoals opgeslagen in Cosmos Container 'mats/deelnemers'
interface DeelnemerData {
  id:       string,
  name:     string,
  weight:   number,
  imageUrl: string,
  team:     string,
  location: string,
  user_id:  string,
  _rid:     string,
  _self:    string,
  _etag:    string,
  _attachments: string,
  _ts:      number
}

@Injectable({
  providedIn: 'root'
})
export class DeelnemersService {
 private _deelnemers = new BehaviorSubject<Deelnemer[]>(
  []
  );

  constructor(private authService: AuthService, private http: HttpClient) { }

 get deelnemers() {
  //console.log(this._deelnemers)
    return this._deelnemers.asObservable();
  }


fetchDeelnemers(){
 return this.http
 .get<{DeelnemerData}>('https://matsdeelnemers.azurewebsites.net/api/deelnemers')   
 // return to be able to subscribe to this observable, also need to subscribe else
 // http request does not work
 .pipe
  (map(resData => {
    const deelnemers = [];
    for (const id in resData) { 
//      if (resData.hasOwnProperty(id)) {     
      //console.log(resData);
      // map DeelnemerData from cosmos db to actual Deelnemer Model
      deelnemers.push(new Deelnemer(
        resData[id].id,
        resData[id].name,
        resData[id].birthdate,
        resData[id].weight,
        resData[id].imageUrl + environment.azureBlobAPIKey,
        resData[id].team,
        resData[id].location,
        resData[id].user_id
        ));
      //}
     }   //loop 
   return deelnemers;  
  }),
  tap(deelnemers => {
    this._deelnemers.next(deelnemers);
  })
 );               
 
}

 getDeelnemer(deelnemerId: string) {
   return this.deelnemers.pipe(                         //allow operation on return array
     take(1),                                           //take 1 array
     map(deelnemers => {                                //map that array to find one deelnemer using find..
       return { ...deelnemers.find(p => p.id === deelnemerId )};
     })
   );
  }

 uploadImage(image: File) {
    
    const uploadData = new FormData();        
    uploadData.append('image', image);
    
    console.log(uploadData);

   return this.http.post<{name: string, type: string, length: number}>(   
      'https://matsstorage2.azurewebsites.net/api/HttpLoadBlob?code=s5UYS2BJx23CHM5bZRw0V9H82LFOg5FFD1PD5cAcEeHJz0x5zhtAlQ==',  //azure blob-storage endpoint
       uploadData
    );

  }

 addDeelnemer(name: string, birthdate: Date,weight: number, imageurl: string, team: string, location: string){
   const newDeelnemer = new Deelnemer(
    Math.random().toString(),
    name,
    birthdate,
    weight,
    imageurl,
    team,
    location,
    this.authService.userId    
  );
     
   //console.log('Nieuwe deelnemer: ' + JSON.stringify(newDeelnemer));
   //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   return this.http.post('https://matsdeelnemers.azurewebsites.net/api/deelnemer', {...newDeelnemer})
   .pipe(
     switchMap(resData => {
     //switch form old observable (returned deelnemer to array of deelnemers )
    console.log(resData);
    return this.deelnemers;
   }),
    take(1),              //take 1 array
    tap(deelnemers => {
    newDeelnemer.imageUrl = newDeelnemer.imageUrl + environment.azureBlobAPIKey; 
    return  this._deelnemers.next(deelnemers.concat(newDeelnemer));
    })           
   ); 
  }

  updateDeelnemer(deelnemerId: string, name: string, birthdate: Date, weight: number) {
    let updatedDeelnemers: Deelnemer[];
    return this.deelnemers.pipe(
      take(1),
      switchMap(deelnemersReturn => {
        
        console.log('updating deelnemer with id: ' + deelnemerId);
        
        const updatedDeelnemerIndex = deelnemersReturn.findIndex(deeln => deeln.id === deelnemerId);
        updatedDeelnemers = [...deelnemersReturn];
        const oldDeelnemer = updatedDeelnemers[updatedDeelnemerIndex];
        updatedDeelnemers[updatedDeelnemerIndex] = new Deelnemer(
          oldDeelnemer.id,
          name,
          birthdate,
          weight,
          oldDeelnemer.imageUrl.replace(environment.azureBlobAPIKey,''),    //strip BlobApiKey from imageUrl
          oldDeelnemer.team,
          oldDeelnemer.location,
          oldDeelnemer.user_id
        );
        return this.http.put(
          `https://matsdeelnemers.azurewebsites.net/api/deelnemer?code=DDBPd74gJBgYpeazCe0S5TsUqVSRGNpLbFT3a84tc4Qp1i6yxie/Ww==`,
          { ...updatedDeelnemers[updatedDeelnemerIndex] }
        );
         
      }),
      tap(() => {
        this._deelnemers.next(updatedDeelnemers);
      })
     );
  }

  deleteDeelnemer(deelnemerId: string) {
    return this.http
      .delete(
        `https://matsdeelnemers.azurewebsites.net/api/deelnemer/${deelnemerId}?code=5iWocuCf9ll37CfVvBd/YGVuo3cjwXdK59WrVH0/DfQOka0MwMagLw==`
      )
      .pipe(
        switchMap(() => {
          return this.deelnemers;
        }),
        take(1),
        tap(deelnemers => {
          this._deelnemers.next(deelnemers.filter(b => b.id !== deelnemerId));
        })
      );
  }

  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  

}


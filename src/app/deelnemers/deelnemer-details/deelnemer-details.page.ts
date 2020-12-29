import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ImagePickerComponent } from 'src/app/shared/image-picker/image-picker.component';
import { Deelnemer } from '../deelnemer.model';
import { DeelnemersService } from '../deelnemers.service';

// helper function to convert base64 string from camera to file (Blob)
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-deelnemer-details',
  templateUrl: './deelnemer-details.page.html',
  styleUrls: ['./deelnemer-details.page.scss'],
})

export class DeelnemerDetailsPage implements OnInit, OnDestroy {
  form: FormGroup;
  deelnemer: Deelnemer;
  private deelnemerSub: Subscription;
  editMode: string;

  constructor(private deelnemersService: DeelnemersService,
              private router:  Router,
              private route:   ActivatedRoute,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      this.editMode = paramMap.get('deelnemerId');
     console.log('parammap deelnemerid: ' + paramMap.get('deelnemerId'));
      
      if (this.editMode === 'new') {
        
      console.log('New editmode ' + this.editMode);
      }
        this.deelnemerSub = this.deelnemersService.getDeelnemer(paramMap.get('deelnemerId')).subscribe(deelnemerreturn => {
        this.deelnemer = deelnemerreturn;
         
       console.log('In Init name  : ' + this.deelnemer.id);
                
       });
  
    });
    
    this.form = new FormGroup({
      id: new FormControl(this.deelnemer.id, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      name: new FormControl(this.deelnemer.name, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      weight: new FormControl(this.deelnemer.weight, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      birthdate: new FormControl(this.deelnemer.birthdate, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
 

}

onSubmit() {
//    if (!form.valid) {
//      return;
//    } 
 
 if (this.editMode !== 'new') {
 console.log('Update deelnemer met nieuw gewicht:' + this.form.value.name + ' gewicht ' + this.form.value.weight);
  //this.form.setValue(value: ['imageUrl',  )
  // this.loadingCtrl
  // .create({
  //   message: 'Updating deelnemer...'
  // })
  // .then(loadingEl => {
  //   loadingEl.present();
   this.deelnemersService
      .updateDeelnemer(
        this.form.value.id,
        this.form.value.name,
        this.form.value.birthdate,
        this.form.value.weight
      )
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/deelnemers']);     
        //loadingEl.dismiss();
      });
//  }); 

 }
 else {

//console.log(this.form.value);
//console.log(this.form.value.name);
console.log('Add deelnemer with name:' + this.form.get('name').value);
//console.log('image value:' + this.form.get('image').value);

//this.loadingCtrl
//.create({
//  message: 'Creating place...'
//}).then(loadingEl => {
 // loadingEl.present();

  this.deelnemersService.uploadImage(this.form.get('image').value)
    .pipe(switchMap( loadRes => { 
      return this.deelnemersService.addDeelnemer(
               this.form.value.name,
               this.form.value.birthdate,
               this.form.value.weight,
               'https://frankresourcegroupdiag.blob.core.windows.net/files/' + loadRes.name,    //imageUrl
              'team frankos',                                                                   //team 
              'adresstraat 55 rosmalen'                                                         //location
           );
    })
    ).subscribe(() => {
         this.form.reset();
         this.router.navigate(['/deelnemers']);
   });
   
      //   switchMap(loadRes => {

    //     console.log('voer hem op');

    //     return this.deelnemersService.addDeelnemer(
    //       this.form.value.name,
    //       this.form.value.birthdate,
    //       this.form.value.weight,
    //       'https://frankresourcegroupdiag.blob.core.windows.net/files/' + loadRes.name, 
    //      'team frankos',
    //      'adresstraat 55 rosmalen'
    //   );
    //  })  
//      ) 
//     .subscribe(() => {
//      // loadingEl.dismiss();
//       this.form.reset();
//       this.router.navigate(['/deelnemers']);
//     });   
  
// })
  }   //else
}

// get imagepicked as string ( base64 from camere or File from filesystem )
onImagePicked(imageData: string | File) {
   let imageFile;
   if (typeof imageData === 'string') {
     try {
       imageFile = base64toBlob(
         imageData.replace('data:image/jpeg;base64,', ''),    //remove prefix from camera string to real base64 string
         'image/jpeg'  //content type from capacitor always image/jpeg
       );
     } catch (error) {
       console.log(error);
       return;
     }
   } else {
     imageFile = imageData;
   }
 this.form.patchValue({ image: imageFile });
 //console.log(this.form.value);
}

ngOnDestroy(){
  if(this.deelnemerSub){
    this.deelnemerSub.unsubscribe();
  }
}
                                    


}

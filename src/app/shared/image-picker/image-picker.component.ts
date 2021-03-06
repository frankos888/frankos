import { Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  selectedImage: string;
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();   //string is base64 image string or File is java File type
  @Input() showPreview = false;
  usePicker: boolean;
  constructor(private platform: Platform) { }

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));   //with hybrid is true we know we are on mobile device
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }


  onPickImage(){
    if (!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      // height: 320,
      width: 300,
      resultType: CameraResultType.Base64
    })
      .then(image => {
       return this.selectedImage = image.base64String;    //dataUrl if problem with size off images
        this.imagePick.emit(image.base64String);
      })
      .catch(error => {
        console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
       }
        return false;
     }); 
    }

    // get file from filesystem using htmlinput element
    onFileChosen(event: Event) {
      const pickedFile = (event.target as HTMLInputElement).files[0];
      if (!pickedFile) {
        return;
      }
      const fr = new FileReader();
      fr.onload = () => {
        const dataUrl = fr.result.toString();
        this.selectedImage = dataUrl;
        this.imagePick.emit(pickedFile);     //emmiting picked file so we have access to it elsewhere
      };
      fr.readAsDataURL(pickedFile);     //read file as base64
    }

}

import { Injectable } from '@angular/core';
import { Camera} from '@ionic-native/camera/ngx';
import {CameraOptions} from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private Cam: Camera) { }

  takepicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.Cam.DestinationType.DATA_URL,
      encodingType: this.Cam.EncodingType.JPEG,
      mediaType: this.Cam.MediaType.PICTURE
    };
    this.Cam.getPicture(options).then((imageData) => {

    }, (err) => {
      console.log(err);
    });
  }
}

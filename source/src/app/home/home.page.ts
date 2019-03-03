import {Component, OnInit} from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FirebaseService} from '../firebase.service';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
public fullname;
public imagename;

  value = {'title': this.fullname, 'description' : 'project', 'image': this.imagename};
  public base64Image: string;

  constructor(public store: AngularFirestore, public fbs: FirebaseService, public camera: Camera) {}


ngOnInit() {
}
submit() {
  this.fbs.createTask(this.value);
}
/*
  fileupload(evt) {
    var files = evt.target.files;
    var file = files[0];
    console.log(file.name);
  }*/

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 70,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImage(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }

  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      const storageRef = firebase.storage().ref('pic' + this.imagename);
      storageRef.putString(imageURI, 'data_url')
          .then(snapshot => {
            resolve(snapshot.metadata);
          }, err => {
            reject(err);
          });
    });
  }

}

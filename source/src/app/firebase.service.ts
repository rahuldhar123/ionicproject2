import { Injectable } from '@angular/core';
import { AngularFirestoreModule , AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public emessage;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore,
              private alrt: AlertController) {
  }

  fireRegister(v1, v2) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(v1, v2).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


  firelogin(v1, v2) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(v1, v2).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentuser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentuser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
          .then(
              res => resolve(res),
              err => reject(err)
          );
    });
  }
}
/*
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  }
*/
/*
  uploadImageToFirebase(image) {
    this.uploadImage(image)
        .then(photoURL => {
          console.log(photoURL);
        }, (err) => {
          this.emessage = err.message;
        });
  }*/


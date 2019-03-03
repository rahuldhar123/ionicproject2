import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public email;
public password;
public eMessage;

  constructor(private auth: FirebaseService, public Nav: Router, private alrt: AlertController) { }

  ngOnInit() {
  }

  login() {
    this.auth.firelogin(this.email, this.password).then(res => {
      console.log(res);
      this.alert1();
      this.Nav.navigate(['/home']);
    }, err => {
      console.log(err);
      this.eMessage = err.message;
      this.alert2(this.eMessage);
    });
  }
register() {
  this.Nav.navigate(['/register']);
}


  async alert1() {
    const alert = await this.alrt.create({
      header: 'Alert',
      subHeader: 'Message',
      message: 'Login successful',
      buttons: ['OK']
    });
    await alert.present();
  }


  async alert2(v1) {
    const alert = await this.alrt.create({
      header: 'Alert',
      subHeader: 'Message',
      message: v1,
      buttons: ['OK']
    });
    await alert.present();
  }

}


import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../firebase.service';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public email;
public password;
public fullname;
public cpassword;
public emessage;
  constructor(private auth: FirebaseService, private nav: Router, private alrt: AlertController ) { }

  ngOnInit() {
  }

  register()
  {
    if(this.password === this.cpassword) {
      if (this.email != null && this.password != null && this.fullname != null) {
        this.auth.fireRegister(this.email, this.password).then(res => {
          console.log(res)
          this.alert1();
          this.nav.navigate(['/Login']);
        }, err => {
          console.log(err)
          this.emessage = err.message;
          this.alert2(this.emessage);
        });
      } else {
        this.alert2('Please Fill the details');
      }
    }
    else {
      this.alert2('confirm password not matched ');
    }
  }

async alert1() {
  const alert = await this.alrt.create({
    header: 'Alert',
    subHeader: 'Message',
    message: 'Registration successful as' + this.fullname,
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

  login() {
    this.nav.navigate(['/login']);
  }
}

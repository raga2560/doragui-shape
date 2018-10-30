import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';



@Injectable()
export class Popservice {

constructor(private alertCtrl: AlertController) {

  }

presentAlert(msg) {
  let alert = this.alertCtrl.create({
    title: 'Message',
    subTitle: msg,
    buttons: ['OK']
  });
  alert.present();
}


}

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ServerlessPayment } from '../../providers/serverlesspayment';

import { ServerlessSendviewPage } from '../serverless-sendview/serverless-sendview';




/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentsmade',
  templateUrl: 'paymentsmade.html',
})
export class PaymentsmadePage {

  loading: any;
  payments: any;
  sentTransactions: any;

  constructor(public navCtrl: NavController,  public paymentService: ServerlessPayment, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
                  this.sentTransactions = '';
  }

  ionViewDidLoad(){

  this.paymentService.getPaymentsMade().then((data) => {
//         alert(JSON.stringify(data));

                if(data == null)
                  this.sentTransactions = '';
                else
                  this.sentTransactions = data;

    }, (err) => {
        console.log("Error reading payment data");
    });



  }

  refresh () {
   this.paymentService.getPaymentsMade().then((data) => {
//         alert(JSON.stringify(data));

                if(data == null)
                  this.sentTransactions = '';
                else
                  this.sentTransactions = data;

    }, (err) => {
        console.log("Error reading payment data ");
    });


  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  viewpaymentmade(payment) {

    this.navCtrl.push('ServerlessSendviewPage', {payment: payment});

  }





}

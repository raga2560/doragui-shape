import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ServerlessPayment } from '../../providers/serverlesspayment';



/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentsreceived',
  templateUrl: 'paymentsreceived.html',
})
export class PaymentsreceivedPage {

  loading: any;
  payments: any;
  receivedTransactions: any;

  constructor(public navCtrl: NavController,  public paymentService: ServerlessPayment, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {


   this.receivedTransactions = '';
  }

  ionViewDidLoad(){
 this.paymentService.getPaymentsReceived().then((data) => {
                if(data == null)
                  this.receivedTransactions = '';
                else
                  this.receivedTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });



  }

  refresh () {
   this.paymentService.getPaymentsReceived().then((data) => {
                if(data == null)
                  this.receivedTransactions = '';
                else
                  this.receivedTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });


  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  showPayment(payment) {
//     this.navCtrl.push('PaymentviewPage', {payment: payment});
  }


   viewpaymentreceived(payment) {

    this.navCtrl.push('ServerlessReceiveviewPage', {payment: payment});

  }



}

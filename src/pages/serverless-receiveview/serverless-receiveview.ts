import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { ServerlessTransaction } from '../../providers/serverlesstransaction';
import { Serverless } from '../../providers/serverless';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the PaymentAcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var foo;


@IonicPage()
@Component({
  selector: 'page-serverless-receiveview',
  templateUrl: 'serverless-receiveview.html',
})
export class ServerlessReceiveviewPage {


  payments: any;
  payment: any;
  balance: any;
  wallet :any;
  walletbalance: any;
  loading: any;
  serverless: any;
  sendingset: any;
  pause6min : any;
  paymentdata: any;
  acceptstatus: any; 
  acceptdata: any;
  errordata: any;

  constructor(public navCtrl: NavController, public paymentService: ServerlessPayment, 
              public loadingCtrl: LoadingController,
              public serverlessService: Serverless,
              private clipboard: Clipboard,
              public serverlessWallet: ServerlessWallet,
              public bitcoinService: Bitcoin,
              public serverlessTransaction: ServerlessTransaction,
              public navParams: NavParams) {

       this.paymentdata = this.navParams.data.payment;


       this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };
       this.balance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };

      this.errordata = {
	preparingmessage: ''
      };



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentIssuePage');
//  this.getPaymentBalance();
  }

  copyaddress () { 
  this.clipboard.copy(this.walletbalance.address);
  }
  

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
  

  getPayment(txid) {
    this.showLoader();


   this.paymentService.getPaymentMade(txid).then((result: any) => {
                this.loading.dismiss();
//                alert(JSON.stringify(result));
                this.paymentdata = result;
                        console.log("payment retrieved");
                                }, (err) => {
                this.loading.dismiss();
                        console.log("payment retreive failed  "+ err);
                                });
  }
   
  createPaymentMade() {
    this.showLoader();

//   var p1 = this.getplandata(this.paymentdata.paymentplanid);
   this.paymentdata.paymentplan = "JSON.stringify(p1)";
   this.paymentdata.vendorid = "p1.vendorid";

   this.paymentService.createPaymentMade(this.paymentdata).then((result) => {
                this.loading.dismiss();
                this.payment = result;
                                        console.log("payment created");
                                }, (err) => {
                this.loading.dismiss();
                //this.alertCtrl.presentAlert(JSON.parse(err._body).error);
                                        console.log("not allowed"+ err);
                                });
  }


  

  getWalletBalance(){

    this.showLoader();

    this.bitcoinService.getBalances(this.wallet.walletkeyaddress).then((result) => {

      this.loading.dismiss();
      this.walletbalance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  getPaymentBalance(){

    this.showLoader();

    // AX_03138A00F
    this.bitcoinService.getBalances(this.paymentdata.paymentaddress).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  
  
}

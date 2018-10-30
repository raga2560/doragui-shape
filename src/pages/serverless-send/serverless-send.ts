import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { ServerlessTransaction } from '../../providers/serverlesstransaction';
import { Serverless } from '../../providers/serverless';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { Bitcoin } from '../../providers/bitcoin';
import {QRCodeComponent} from 'angular2-qrcode';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { environment } from '../../config/environment';
  
let url = environment.url;
let bitcoinMinimumSend = environment.bitcoinMinimumSend;
let bitcoinMinimumReceive = environment.bitcoinMinimumReceive;


/**
 * Generated class for the PaymentAcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var foo;


@IonicPage()
@Component({
  selector: 'page-serverless-send',
  templateUrl: 'serverless-send.html',
})
export class ServerlessSendPage {


  payments: any;
  payment: any;
  balance: any;
  walletbalance: any;
  loading: any;
  serverless: any;
  sendingset: any;
  pause6min : any;
  broadcasttx: any;
  paymentdata: any;
  acceptstatus: any; 
  acceptdata: any;
  errordata: any;
  @ViewChild(QRCodeComponent) qrcode: QRCodeComponent;

  constructor(public navCtrl: NavController, public paymentService: ServerlessPayment, 
              public loadingCtrl: LoadingController,
              public socialSharing: SocialSharing,
              public serverlessService: Serverless,
              private clipboard: Clipboard,
              public serverlessWallet: ServerlessWallet,
              public bitcoinService: Bitcoin,
              public serverlessTransaction: ServerlessTransaction,
              public navParams: NavParams) {

       this.broadcasttx= '';

       this.serverless = {
            sendamount: '',
            sendpincode: '',
            sendqrcode: '',
            sendstring: '',
            sendtxid: '',
            sendaddress: ''
       };
       this.pause6min = false;

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
       this.paymentdata = {
            paymentid: '',
            paymenttxid: '',
            paymentaddress: '',
            payeename: '',
            paymentconfirmation: 0,
            payeephone: '',
            paymentvalue: '',
            paymentpin: ''

       };
      this.errordata = {
	preparingmessage: ''
      };

      this.sendingset = {
      address: '',
      uidkey: '',
      moneydata: ''
      };

  this.getWalletBalance();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentIssuePage');
  }

  copyaddress () { 
  this.clipboard.copy(this.walletbalance.address);
  }
  
  copystring () { 
  this.clipboard.copy(this.serverless.sendstring);
  }
  copypincode () { 
  this.clipboard.copy(this.serverless.sendpincode);
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
  
  regularShareMessage(){
  this.socialSharing.share(this.serverless.sendstring, null, null, null);
  }

  regularShare(){
  var msg =1;
  let el: ElementRef = this.qrcode['elementRef'];
let html : string  = el.nativeElement.innerHTML;
let img64: string  = html.substr(0, html.length - 2).split('base64,')[1];
img64 = "data:image/png;base64," + img64;

  this.socialSharing.share(null, null, img64, html);
  }

  twitterShare(index){
  let el: ElementRef = this.qrcode['elementRef'];
let html : string  = el.nativeElement.innerHTML;
let img64: string  = html.substr(0, html.length - 2).split('base64,')[1];
  this.socialSharing.shareViaTwitter(null, img64, html);
  }

  facebookShare(index){
  let el: ElementRef = this.qrcode['elementRef'];
let html : string  = el.nativeElement.innerHTML;
let img64: string  = html.substr(0, html.length - 2).split('base64,')[1];
    this.socialSharing.shareViaFacebook(null, img64, html);
  }
  
  whatsappShare(){
  let el: ElementRef = this.qrcode['elementRef'];
 let html : string  = el.nativeElement.innerHTML;
 let img64: string  = html.substr(0, html.length - 2).split('base64,')[1];
   this.socialSharing.shareViaWhatsApp(null, img64, html);
 }
  whatsappShareMessage(){
   this.socialSharing.shareViaWhatsApp(this.serverless.sendstring, null, null);
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

    var wallet = this.serverlessWallet.getBitcoinWallet();
    this.bitcoinService.getBalances(wallet.walletkeyaddress).then((result) => {

      this.loading.dismiss();
      this.walletbalance = result;
      if(this.walletbalance.unconfirmed_balance != 0)
      this.pause6min = true;
      else 
      this.pause6min = false;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  getPaymentBalance(){

    this.showLoader();

    // AX_03138A00F
    this.bitcoinService.getBalances(this.serverless.sendaddress).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  pausetransaction () {
  this.pause6min = true;

   setTimeout(()=>{    //<<<---    using ()=> syntax
     this.pause6min = false;
    }, 30000);

   }

  
  prepareToSend(){
    
    if(this.walletbalance.unconfirmed_balance !=  0)
    {
        alert("Wait for unconfirmed transaction to finish " );
        this.getWalletBalance();
      
        return;
    }

    if(this.pause6min == true)
    {
        alert("Wait 6 min to complete earlier transaction" );
	return ;
    }
    if(this.serverless.sendamount == '')
    {
        alert("Enter amount to send " );
	return ;

    }
    if(this.serverless.sendamount > this.walletbalance.balance)
    {
        alert("No sufficient balance in wallet="+this.walletbalance.address);
	return ;
    }
    if(this.serverless.sendamount < bitcoinMinimumSend )
    {
        alert("Minimum amount to send = "+bitcoinMinimumSend );
	return ;
    }

    this.sendingset = this.serverlessService.getSendingSet();
    //alert(JSON.stringify(this.sendingset));
    this.showLoader();
    this.serverless.sendpincode = this.sendingset.moneydata.randompin;
    this.serverless.sendaddress = this.sendingset.address;

    var removedpinset = this.sendingset; 
    removedpinset.moneydata.randompin = '';

    this.serverless.sendstring = "PAYMSG_"+(new foo.Buffer.Buffer(JSON.stringify(removedpinset))).toString('base64');
    this.serverless.sendqrcode = "PAYMSG_"+(new foo.Buffer.Buffer(JSON.stringify(removedpinset))).toString('base64');

    this.serverlessService.prepareToSend(this.serverless.sendamount, this.sendingset).then ((result:any) => {

      this.loading.dismiss();
      var result1 = result;
      this.serverless.sendtxid = result1.tx.hash;

       this.paymentdata = {
            paymentid: '',
            paymenttxid: this.serverless.sendtxid,
            paymentaddress: this.serverless.sendaddress,
            payeename: '',
            payeephone: '',
            paymentstring: this.serverless.sendstring,
            paymentpin: this.serverless.sendpincode,
            paymentconfirmation: 0,
            paymentvalue: this.serverless.sendamount
      };

      this.paymentService.createPaymentMade(this.paymentdata);
      this.getWalletBalance();
//      this.serverlessTransaction.updateTransactions(this.serverless.senttxid);

    }, (err) => {
      this.loading.dismiss();
      if(typeof err === 'object')  {
      
              if(Object.is(err, {})) {
                this.errordata.preparingmessage = "Waiting for 6 confirmations of previous spending";

              }
              else {
		this.errordata.preparingmessage = JSON.stringify(err)
              }
      }
      else {
              if(err == '{}') {
                this.errordata.preparingmessage = "Waiting for 6 confirmations of previous spending";

              }
              else {
                this.errordata.preparingmessage = err.reason;
              }
      }
     if(err == 'Error: Transaction has no inputs')
     {
       this.errordata.preparingmessage = "Waiting for 6 confirmations of previous spending";
     }
     else {
       this.errordata.preparingmessage = err.reason;
       console.log("err="+ err);
     }
    });
 

  }

  
}

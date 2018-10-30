import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { Serverless } from '../../providers/serverless';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {QRCodeComponent} from 'angular2-qrcode';



/**
 * Generated class for the PaymentAcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var foo;


@IonicPage()
@Component({
  selector: 'page-serverless-receive',
  templateUrl: 'serverless-receive.html',
})
export class ServerlessReceivePage {


  payments: any;
  payment: any;
  balance: any;
  wallet: any;
  walletbalance: any;
  errordata: any;
  loading: any;
  serverless: any;
  paymentdata: any;
  acceptstatus: any; 
  acceptdata: any;
 @ViewChild(QRCodeComponent) qrcode: QRCodeComponent;


  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public paymentService: ServerlessPayment,
              public serverlessWallet: ServerlessWallet,
              private clipboard: Clipboard,
              private qrScanner: QRScanner,
 	      public bitcoinService: Bitcoin,
              public serverlessService: Serverless,
              public navParams: NavParams) {


       this.serverless = {
            receivedqrcode: '',
            receivedstring: '',
            receivedtxid: '',
            receivedpincode: '',
            receivedaddress: '',
            receivedamount: ''
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
        receivedmessage: ''
      };


       this.balance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };
       this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };

       this.acceptdata = {
            paymentpin: '',
            paymentmetadata: '',
            acceptaddress: ''
       };
   this.wallet = this.serverlessWallet.getBitcoinWallet();
   this.getWalletBalance();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentIssuePage');
  }

  qrscan() {
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.serverless.receivedqrcode = text;
         this.serverless.receivedstring = text;
         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));

  }



  pastestring ()
  {
     this.clipboard.paste().then(
   (resolve: string) => {
      this.serverless.receivedstring = resolve;
      this.serverless.receivedqrcode = resolve;
      //alert(resolve);
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );

  }

  pastepincode ()
  {
    this.clipboard.paste().then(
   (resolve: string) => {
      this.serverless.receivedpincode = resolve;
  //    alert(resolve);
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

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

  
 
  receiveFund(){
   
  if(this.serverless.receivedstring == '')
  {
	alert("Receiving message string not found");
        return;
  }
 
 var mystr = this.serverless.receivedstring.substr(7);
 
var p = new foo.Buffer.Buffer(mystr, 'base64');
var s = p.toString();

    var data = JSON.parse(s ); 
    var stub = data.moneydata;
    stub.randompin = this.serverless.receivedpincode;
    var address=data.address;
    var uid= new foo.Buffer.Buffer(data.uidkey, 'hex');

    console.log(stub);


     this.showLoader();

     this.serverlessService.receiveFund(stub, uid, this.wallet.walletkeyaddress ).then ((result:any) => {
 
       this.loading.dismiss();
       var result1 = result;
       this.serverless.receivedtxid = result1.tx.hash;
       this.serverless.receivedamount = result1.tx.total;

       this.paymentdata = {
            paymentid: '',
            paymenttxid: this.serverless.receivedtxid,
            paymentaddress: result1.tx.inputs[0].addresses[0],
            payeename: '',
            payeephone: '',
            paymentstring: this.serverless.receivedstring,
            paymentpin: this.serverless.receivedpincode,
            paymentconfirmation: 0,
            paymentvalue: result1.tx.total
      };

     this.paymentService.createPaymentReceived(this.paymentdata);
    
 
     }, (err) => {
       this.loading.dismiss();
       if(typeof err === 'object') this.errordata.receivedmessage = err.reason;
       else this.errordata.receivedmessage = err.reason;
      console.log("err="+ err);
     });

  
  }
}

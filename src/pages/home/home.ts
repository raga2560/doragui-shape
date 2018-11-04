import { Component  , ViewChild} from "@angular/core";
import { NavController,Platform, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { ServerlessSendviewPage } from '../serverless-sendview/serverless-sendview';
import { ServerlessReceiveviewPage } from '../serverless-receiveview/serverless-receiveview';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { RegularEngine } from '../../providers/regularengine';
import { ShapeshiftProvider } from '../../providers/shapeshift';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {QRCodeComponent} from 'angular2-qrcode';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';

import { SocialSharing } from '@ionic-native/social-sharing';
import { environment } from '../../config/environment';
  
let url = environment.url;
let bitcoinMinimumSend = environment.bitcoinMinimumSend;
let bitcoinMinimumReceive = environment.bitcoinMinimumReceive;



@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  relationship = 'bitcoin';
  refreshEnable : any;
  sentTransactions: any;
  scanSub : any;
 serverless: any;
  sendingset: any;
   errordata: any;

  pause6min : any;

  sendaddress= '';
  walletbalance: any;
  sendqrcode= '';
  paymentdata: any;

  wallet: any;
  receiveqrcode= '';
  addresstoreceive='';
  amounttosend=0;
  receivedTransactions: any; 
 @ViewChild(QRCodeComponent) qrcode: QRCodeComponent;


  constructor(public navCtrl: NavController,  public modalCtrl: ModalController, 
    public paymentService: ServerlessPayment,
    public shapeshift: ShapeshiftProvider,
  // public serverlessService: Serverless,
    public walletService: ServerlessWallet,
    public plt: Platform,
    public serverlessWallet: ServerlessWallet,
    public serverlessRegular: RegularEngine,
    private clipboard: Clipboard,
    public socialSharing: SocialSharing,
    
    public bitcoinService: Bitcoin,
     private qrScanner: QRScanner,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  this.refreshEnable = true;
  this.sentTransactions = '';
  this.receivedTransactions = '';
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
   this.errordata = {
        message: ''
      };

      this.sendingset = {
      address: '',
      uidkey: '',
      moneydata: ''
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

  this.walletService.initializeBitcoinWallet().then(a=>{

  this.wallet = this.serverlessWallet.getBitcoinWallet();
  this.receiveqrcode= this.wallet.walletkeyaddress;
  this.getWalletBalance();

  });
  this.walletService.initializeDashcoinWallet();


  shapeshift.getRate('bch_ltc', function(error, rate: any) {

	alert( rate._body);
  });
 
  let withdrawalAddress =  '3JTYAfjWq2N3xL5kUTQrrfKGNPiwTTgjvX';  //ltc
  let returnAddress =  '3JTYAfjWq2N3xL5kUTQrrfKGNPiwTTgjvX'; 
  let accessToken =  ''; 
                let data = {
                withdrawal: withdrawalAddress,
                pair: 'bch_ltc',
                returnAddress,
                token: accessToken
              };
    shapeshift.shift(data, (err, shapeData) => {
                if (err ) {
                  alert(shapeData._body);
                  return;
            }
           alert(shapeData.deposit);

      })



  }

  copyaddress () {
  this.clipboard.copy(this.walletbalance.address);
  }



  ionViewDidLoad(){

 this.paymentService.getPaymentsMade().then((data) => {
//         alert(JSON.stringify(data));

		if(data == null) 
                  this.sentTransactions = '';
                else 
                  this.sentTransactions = data;

    }, (err) => {
        console.log("not allowed");
    });

 this.paymentService.getPaymentsReceived().then((data) => {
		if(data == null) 
                  this.receivedTransactions = '';
		else
                  this.receivedTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });


  }
  regularShareAddress(){
  this.socialSharing.share(this.receiveqrcode , null, null, null);
  }


  
  whatsappShareAddress(){
   this.socialSharing.shareViaWhatsApp(this.receiveqrcode , null, null);
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


  clear () {

   this.paymentService.clearPaymentsReceived();
   this.paymentService.clearPaymentsMade();
  }
  
  viewpaymentmade(payment) {

    this.navCtrl.push('ServerlessSendviewPage', {payment: payment});

  }
  viewpaymentreceived(payment) {

    this.navCtrl.push('ServerlessReceiveviewPage', {payment: payment});

  }
 
  scanqrcode()
  {
	alert("Not yet implemented");
  }

  directSend(){

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

    this.sendingset = this.serverlessRegular.getSendingSet(this.sendaddress);
    //alert(JSON.stringify(this.sendingset));
    this.showLoader();
    this.serverless.sendpincode = this.sendingset.moneydata.randompin;
    this.serverless.sendaddress = this.sendingset.address;

    var removedpinset = this.sendingset;
    removedpinset.moneydata.randompin = '';
   
    this.serverless.sendstring = "REGULAR_SEND";
    this.serverless.sendqrcode = this.serverless.sendstring ;

    this.serverlessRegular.sendBitcoin(this.serverless.sendamount, this.sendingset).then ((result:any) => {

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
      this.pausetransaction();
//      this.serverlessTransaction.updateTransactions(this.serverless.senttxid);

    }, (err) => {
      this.loading.dismiss();
      if(typeof err === 'object') this.errordata.message = err.reason;
      else this.errordata.preparingmessage = err;
     console.log("err="+ err);

 });


  }

   pausetransaction () {
  this.pause6min = true;

   setTimeout(()=>{    //<<<---    using ()=> syntax
     this.pause6min = false;
    }, 30000);

   }




  scan () {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.sendqrcode = text;
         alert('Scanned something:'+ text);
         this.qrScanner.hide();
         this.scanSub.unsubscribe(); 
        
        });

        this.qrScanner.show();
      } else if (status.denied) {
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime.');
      }
    })
    .catch((e: any) => console.log('Error is', e));

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Processing...'
    });

    this.loading.present();

  }

  logout(){
    
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }

  pastestring ()
  {
   if (this.plt.is('cordova')) {

     this.clipboard.paste().then(
   (resolve: string) => {
      this.sendaddress = resolve;
      //alert(resolve);
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );
   }
   else {
	alert("Feature not supported");
   }

  }

 
  refresh() {
  this.refreshEnable = false;

setTimeout(()=>{    //<<<---    using ()=> syntax
  this.refreshEnable = true;
 }, 3000);
  
 }

}

import { Component } from '@angular/core';
import { IonicPage, Platform, LoadingController, NavController, NavParams } from 'ionic-angular';
import {EmailComposer} from '@ionic-native/email-composer';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import * as pdfMake from '../../assets/js/pdfmake/pdfmake';
import * as pdfFonts from '../../assets/js/pdfmake/vfs_fonts';
import {  ToastController } from 'ionic-angular';

import { ServerlessWallet } from '../../providers/serverlesswallet';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the BalancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var foo;

@IonicPage()
@Component({
  selector: 'page-setuprecovery',
  templateUrl: 'setuprecovery.html',
})
export class SetupRecoveryPage {

  loading: any;
  plan: any;
  plans: any;
  feesdata: any;
  walletbalance: any;
  recoverydata: any;
  encrypteddata: any; 
  encryptioninprogress = false;
  base64recoverydata: any;
  externalwallet: any;
  walletpassword: string;
  wallet: any;
  pdfurl='';

  chargingdata: any;
  chargingamount : any;
  feesamount : any;
  serverless: any;
  feeslevel: any;
  availablePlans : any;
  relationship = 'bitcoin';
 
  plandata : any;
  pdfObj = null;

  constructor(public navCtrl: NavController, 
	      private emailComposer: EmailComposer,
              private clipboard: Clipboard,
              private plt: Platform,
              public bitcoinService: Bitcoin,
              public file: File, public toastCtrl: ToastController,
              public fileOpener: FileOpener,
              public serverlessWallet: ServerlessWallet,
              public loadingCtrl: LoadingController,
	      public navParams: NavParams) {

       this.serverless = {
	contractid: 'CONT1',
	balance: '',
	walletaddress: '',
	fees: '',

       };
      this.walletpassword = '';

       this.feeslevel = [
	 {levelname: "low", levelfees: 20},
	 {levelname: "medium", levelfees: 30},
	 {levelname: "high", levelfees: 50},

       ];
       this.wallet = this.serverlessWallet.getBitcoinWallet();

       this.externalwallet = {
         sendaddress: '',
         sendamount: ''
       };

       this.feesdata = {
	  address: '',
          balance: ''
       };

       this.chargingdata = {
	  address: '',
          balance: ''
       };
       this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };


       this.feesamount = "0";
       this.getWalletBalance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  copyaddr() {
   this.clipboard.copy(this.walletbalance.address);
  }

  saveexternaladdress() {
       if(this.externalwallet.sendaddress == '')
       {
	 alert('Enter external address');
         return;
       }
       this.serverlessWallet.setExternalBitcoinWallet(this.externalwallet);
  }

  sendexternalamount() {
       var ext = this.serverlessWallet.getExternalBitcoinWallet();
       if(ext.sendaddress == '')
       {
	 alert('External address not set');
         return;
       }
       if(this.externalwallet.sendamount > this.walletbalance.balance)
       {
	 alert('No balance to send ');
         return;
       }
  
	 alert('Will be implemented shorty');
       // transfer code to be added here 
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



createPdf() {

if(this.walletpassword.length <5 )
{
  alert("Enter wallet password, length greater that 5 characters");
  return;
}

this.encryptioninprogress = true;
  alert("Preparing recovery file ");
    this.showLoader();
setTimeout(()=>{    
      this.loading.dismiss();
 }, 3000);


this.serverlessWallet.getEncrypedBitcoinWallet(this.walletpassword).then(function(data) {
 this.encrypteddata = data;
  }.bind(this), function(err){
  
 }.bind(this));

let self = this;
this.recoverydata = {
  bitcoindata: this.encrypteddata,
  dashcoindata: this.encrypteddata,
  userid: 'UD5GT3456',
  checksum: '5ab456'
 };

this.base64recoverydata = "RECOVERYDATA_"+(new foo.Buffer.Buffer(JSON.stringify(this.recoverydata))).toString('base64');


 var docDefinition = {
      content: [
 
 
        { text: this.base64recoverydata, style: 'story', margin: [0, 20, 0, 20] },
 
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
  }
;
this.encryptioninprogress = false;

this.pdfObj = pdfMake.createPdf(docDefinition);

/*
alert("open");
this.pdfObj.open();
alert("print");

this.pdfObj.print();
*/
this.pdfObj.getDataUrl(function(dataUrl) {
    this.pdfurl = dataUrl;
}.bind(this), function(err){
 console.log(err);
}.bind(this));


}

downloadPdf() {

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
	console.log("data dir="+ this.file.dataDirectory);
//	alert("before write data dir="+ this.file.dataDirectory);
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'WalletRec.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
//	alert("after write data dir="+ this.file.dataDirectory);
          this.fileOpener.open(this.file.dataDirectory + 'WalletRec.pdf', 'application/pdf');
        })
     .catch((err) => {
       alert(err);
       console.error(err);
     });

      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download("WalletRec.pdf");
    }
 

  }

  
  sendEmail() {
    if (this.plt.is('cordova')) {
     this.emailComposer.isAvailable().then((available: boolean) =>{
 	if(available) {
   	//Now we know we can send
 	}
        else {
	alert (" No permission to access email");

        }
     });

//	alert("before write data dir="+ this.file.dataDirectory);
        // Save the PDF to the data Directory of our App
       let email = {
         to: '',
         subject: 'Wallet recovery data',
         body: this.base64recoverydata,
         isHtml: true
       };
       this.emailComposer.open(email);


     }

}

  
}




import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';

import { ServerlessWallet } from '../../providers/serverlesswallet';

/**
 * Generated class for the BalancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serlessetting',
  templateUrl: 'serlessetting.html',
})
export class SerlessettingPage {

  loading: any;
  plan: any;
  plans: any;
  relationship = 'bitcoin';
  feesdata: any;
  walletbalance: any;
  externalwallet: any;
  wallet: any;

  chargingdata: any;
  chargingamount : any;
  feesamount : any;
  serverless: any;
  feeslevel: any;
  availablePlans : any;
 
  plandata : any;

  constructor(public navCtrl: NavController, 
              private clipboard: Clipboard,
              public bitcoinService: Bitcoin,
              public serverlessWallet: ServerlessWallet,
              public loadingCtrl: LoadingController,
	      public navParams: NavParams) {

       this.serverless = {
	contractid: 'CONT1',
	balance: '',
	walletaddress: '',
	fees: '',

       };

       this.feeslevel = [
	 {levelname: "low", levelfees: 20},
	 {levelname: "medium", levelfees: 30},
	 {levelname: "high", levelfees: 50},

       ];
       this.wallet = this.serverlessWallet.getBitcoinWallet();

       this.plandata = {
	  vendoraddress: '',
          balance: {}

       };
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
       if(ext == null)
       {
	 alert('External address not set');
         return;
       }
       if(ext.sendaddress == '' || ext.sendaddress == null)
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


}

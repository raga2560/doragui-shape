import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


import { environment } from '../config/environment';

let url = environment.url;
let bitcoinMinimumSend = environment.bitcoinMinimumSend;
let bitcoinMinimumReceive = environment.bitcoinMinimumReceive;

@Injectable()
export class ServerlessPayment {

  url : string;
  constructor(public http: Http, 
        private storage: Storage,
	public authService: Auth) {
     this.url = url;

  }

  getPaymentsMade(){

    return new Promise((resolve, reject) => {

      this.storage.get('paymentsmade').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentMade(txid){

    return new Promise((resolve, reject) => {

      this.storage.get('paymentsmade').then((val) => {
        console.log('Your age is', val);
         var p1;
         for(var i=0; i< val.length  ; i++)
         {
                if(val[i].paymenttxid == txid)
                {
                p1 = val[i];
		break;
                }
         }
          resolve(p1);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentsReceived(){

    return new Promise((resolve, reject) => {
      this.storage.get('paymentsreceived').then((val) => {
        console.log('Your age is', val);
        
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentReceived(txid){

    return new Promise((resolve, reject) => {
      this.storage.get('paymentsreceived').then((val) => {
        console.log('Your age is', val);
         var p1;
         for(var i=0; i< val.length  ; i++)
         {
                if(val[i].paymenttxid == txid)
                {
                p1 = val[i];
		break;
                }
         }
          resolve(p1);
      }, (err) => {
          reject(err);

     });

    });

  }


  createPaymentReceived(paymentdata){


  return new Promise((resolve, reject) =>  {


   this.storage.get('paymentsreceived').then((data) => {
      if(data != null)
      {
        data.push(paymentdata);
        this.storage.set('paymentsreceived', data);
      }
      else
      {
        let array = [];
        array.push(paymentdata);
        this.storage.set('paymentsreceived', array);
      }

          resolve(0);
     });
    });

  }

 clearPaymentsReceived(){
        let array = [];
        this.storage.set('paymentsreceived', array);
 }
  
  createPaymentMade(paymentdata){


  return new Promise((resolve, reject) =>  {


   this.storage.get('paymentsmade').then((data) => {
      if(data != null)
      {
        data.push(paymentdata);
        this.storage.set('paymentsmade', data);
      }
      else
      {
        let array = [];
        array.push(paymentdata);
        this.storage.set('paymentsmade', array);
      }

          resolve(0);
  });
 });
  
 }
 clearPaymentsMade(){
        let array = [];
        this.storage.set('paymentsmade', array);
 }

}

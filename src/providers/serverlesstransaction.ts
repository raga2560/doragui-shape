import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class ServerlessTransaction {

  url : string;
  constructor(public http: Http, 
        private storage: Storage,
	public authService: Auth) {
     this.url = url;

  }

  getTransactions(){

    return new Promise((resolve, reject) => {

      this.storage.get('transactions').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  getTransaction(txid){

    return new Promise((resolve, reject) => {

      this.storage.get('transactions').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  updateTransactions(todo){
      this.storage.set('transactions', todo);
  }


}

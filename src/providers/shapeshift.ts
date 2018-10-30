import { Http, Headers } from '@angular/http';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// providers

@Injectable()
export class ShapeshiftProvider {
  private credentials;

  constructor(
    private http: Http,
  ) {
    this.credentials = {};
  this. setCredentials();
  }

  public setCredentials() {
    // (Mandatory) Affiliate PUBLIC KEY, for volume tracking, affiliate payments, split-shifts, etc.

    /*
    * Development: 'testnet'
    * Production: 'livenet'
    */
    this.credentials.NETWORK = 'livenet';
    this.credentials.API_URL = 'https://shapeshift.io';
    this.credentials.NETWORK === 'testnet';

    this.credentials.API_KEY = null;
  }

  public getNetwork() {
    return this.credentials.NETWORK;
  }

  public shift(data, cb) {
    const dataSrc = {
      withdrawal: data.withdrawal,
      pair: data.pair,
      returnAddress: data.returnAddress,
      apiKey: this.credentials.API_KEY
    };

    const url = this.credentials.API_URL + '/shift';
    const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + data.token
    });

    this.http.post(url, dataSrc, { headers }).subscribe(
      data => {
        return cb(null, data);
      },
      data => {
        return cb(data.error.message);
      }
    );
  }

  public saveShapeshift(data, opts, cb): void {
    const network = this.getNetwork();
  }

  public getShapeshift(cb) {
    const network = this.getNetwork();
  }

  public getRate(pair: string, cb) {
    this.http.get(this.credentials.API_URL + '/limit/' + pair).subscribe(
      data => {
        return cb(null, data);
      },
      data => {
        return cb(data);
      }
    );
  }

  public getLimit(pair: string, cb) {
    this.http.get(this.credentials.API_URL + '/limit/' + pair).subscribe(
      data => {
        return cb(null, data);
      },
      data => {
        return cb(data);
      }
    );
  }

  public getMarketInfo(pair: string, cb) {
    this.http.get(this.credentials.API_URL + '/marketinfo/' + pair).subscribe(
      data => {
        return cb(null, data);
      },
      data => {
        return cb(data);
      }
    );
  }

  public getStatus(addr: string, token: string, cb) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    });
    this.http
      .get(this.credentials.API_URL + '/txStat/' + addr, { headers })
      .subscribe(
        data => {
          return cb(null, data);
        },
        data => {
          return cb(data.error);
        }
      );
  }

  public register(): void {
  }

  public getOauthCodeUrl() {
  }

  public getSignupUrl() {
    return this.credentials.HOST + '/signup';
  }

  public getStoredToken(cb) {
  }

  public getToken(code, cb) {
  }

  private _afterTokenReceived(data, cb) {
  }

}

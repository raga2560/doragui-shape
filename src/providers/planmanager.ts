import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class Planmanager {

  url : string;
  constructor(public http: Http, public authService: Auth) {
     this.url = url;

  }

  getAvailablePlans(vendorid){

    var tryurl = this.url + '/api/planmanager/getAvailablePlans/' + vendorid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  getAvailableSchemes(vendorid){

    var tryurl = this.url + '/api/planmanager/getAvailableSchemes/' + vendorid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  getPlan(pairid, whichside){

    if(!whichside) whichside = "server";

    var tryurl = this.url + '/api/planmanager/plan/' + whichside + "/"+ pairid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  getPlans(){

    var tryurl = this.url + '/api/planmanager/getPlans' 
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createPlan(vendordata){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url + '/api/planmanager/createPlan',JSON.stringify(vendordata), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deletePlan(pairid){

    var tryurl = this.url + '/api/planmanager/delete/' + pairid;

  	return new Promise((resolve, reject) => {

	    let headers = new Headers();
	    headers.append('Authorization', this.authService.token);

	    this.http.delete(tryurl, {headers: headers}).subscribe((res) => {
	    	resolve(res);
	    }, (err) => {
	    	reject(err);
	    });    

  	});

  }
  
  pauseActivatePlan(pauseactivate){

    var pairid;
 
    var tryurl = this.url + '/api/planmanager/pairpauseactivate/' + pairid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,JSON.stringify(pauseactivate), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

}

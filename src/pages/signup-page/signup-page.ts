import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Popservice } from '../../providers/popservice';
import { HomePage } from '../home/home';
import { environment } from '../../config/environment';

let termsurl = environment.termsurl;

@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {

  role: string;
  email: string;
  password: string;
  loading : any;
  termsurl : any;
  registrationcode: string;

  constructor(public navCtrl: NavController, 
		public authService: Auth, 
		public alertCtrl: Popservice, 
		public loadingCtrl: LoadingController) {

     this.termsurl = termsurl;
  }

  ionViewDidLoad() {

  }
 


  register(){

    this.showLoader();

  	let details = {
  	    email: this.email,
  	    password: this.password,
  	    role: this.role,
            registrationcode: this.registrationcode
  	};

  	this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
  	}, (err) => {
                
  		this.loading.dismiss();
                this.alertCtrl.presentAlert(JSON.parse(err._body).error);
  	});

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}

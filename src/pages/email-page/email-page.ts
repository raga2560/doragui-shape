import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { AccountKit, AuthResponse, LoginParams } from 'ng2-account-kit';

@Component({
  selector: 'email-page',
  templateUrl: 'email-page.html'
})
export class EmailPage {

	email: string;
	password: string;
	loading: any;

	constructor(public navCtrl: NavController, public authService: Auth, 
		public loadingCtrl: LoadingController) {

        }

        ngOnInit() {
/*
    AccountKit.init({
      appId: '401873316990626',
      state: 'xx',
      version: 'v1.3'
    })
*/

	}

	ionViewDidLoad() {
/*
		this.showLoader();

		//Check if already authenticated
		this.authService.checkAuthentication().then((res) => {
			console.log("Already authorized");
			this.loading.dismiss();
			this.navCtrl.setRoot(HomePage);
		}, (err) => {
			console.log("Not already authorized");
			this.loading.dismiss();
		});
*/
	}

    emailvalidate(){
 
    var login: LoginParams = {
    emailAddress : this.email,
    countryCode : '',
    phoneNumber : ''
    };
 
        AccountKit.login('EMAIL', login ).then(
    (response: AuthResponse) => {
      console.log(response.code);
      // Your auth service to subscribe
    },
    (error: any) => console.error(error)
       );
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }

    showLoader(){

		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();

    }

}

import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


import {HomePage} from '../pages/home/home';
import {SerlessettingPage} from '../pages/serverless-setting/serlessetting';
import {ServerlessWalletPage} from '../pages/serverless-wallet/serverlesswallet';
import {RecoverWalletPage} from '../pages/recover-wallet/recoverwallet';
import {PaymentsmadePage} from '../pages/paymentsmade/paymentsmade';
import {PaymentsreceivedPage} from '../pages/paymentsreceived/paymentsreceived';
import {SetupRecoveryPage} from '../pages/setup-recovery/setuprecovery';
import {ServerlessSendPage} from '../pages/serverless-send/serverless-send';
import {ServerlessReceivePage} from '../pages/serverless-receive/serverless-receive';

import {LoginPage} from '../pages/login-page/login-page';
import {SignupPage} from '../pages/signup-page/signup-page';
import {EmailPage} from '../pages/email-page/email-page';


@Component({
    templateUrl: 'app.html'
})
export class MyApp
{
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen)
    {
        this.initializeApp();

        // used for an example of ngFor and navigation


        this.pages = [
            {title: 'Home', component: HomePage, icon: 'home'},
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Wallet ', component: ServerlessWalletPage, icon: 'arrow-forward'},
            {title: 'Wallet Access ', component: LoginPage, icon: 'key'},
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Setup Wallet Recovery', component: SetupRecoveryPage, icon: 'archive'},
            {title: 'Recover Wallet', component: RecoverWalletPage, icon: 'arrow-down'},
            {title: 'Divider', component: '', icon: 'none'},

            {title: 'Pay as Message', component: ServerlessSendPage, icon: 'return-right'},
            {title: 'Receive Payment ', component: ServerlessReceivePage, icon: 'return-left'},
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Payments Made ', component: PaymentsmadePage, icon: 'arrow-dropright-circle'},
            {title: 'Payments Received', component: PaymentsreceivedPage, icon: 'arrow-dropleft-circle'},
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'External Setting', component: SerlessettingPage, icon: 'settings'}
        ];

    }

    initializeApp()
    {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });


    }

    openPage(page)
    {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

}

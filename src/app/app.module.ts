import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {EmailComposer} from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';



import { QRCodeModule } from 'angular2-qrcode';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ServerlessWalletPageModule } from '../pages/serverless-wallet/serverlesswallet.module';
import { SetupRecoveryPageModule } from '../pages/setup-recovery/setuprecovery.module';
import { RecoverWalletPageModule } from '../pages/recover-wallet/recoverwallet.module';
import {PaymentsmadePageModule} from '../pages/paymentsmade/paymentsmade.module';
import {PaymentsreceivedPageModule} from '../pages/paymentsreceived/paymentsreceived.module';


import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { EmailPage } from '../pages/email-page/email-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Auth } from '../providers/auth';
import { Bitcoin } from '../providers/bitcoin';
import { Popservice } from '../providers/popservice';
import { ShapeshiftProvider } from '../providers/shapeshift';
import { RegularEngine } from '../providers/regularengine';
import { Serverless } from '../providers/serverless';
import { ServerlessWallet } from '../providers/serverlesswallet';
import { ServerlessTransaction } from '../providers/serverlesstransaction';
import { ServerlessPayment } from '../providers/serverlesspayment';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ServerlessSendPageModule } from '../pages/serverless-send/serverless-send.module';
import { ServerlessSendviewPageModule } from '../pages/serverless-sendview/serverless-sendview.module';
import { ServerlessReceiveviewPageModule } from '../pages/serverless-receiveview/serverless-receiveview.module';
import { ServerlessReceivePageModule } from '../pages/serverless-receive/serverless-receive.module';
import { SerlessettingPageModule } from '../pages/serverless-setting/serlessetting.module';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    EmailPage, 
    SignupPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    QRCodeModule,
    ServerlessWalletPageModule,
    SetupRecoveryPageModule,
    RecoverWalletPageModule,
    SerlessettingPageModule,
    ServerlessSendPageModule,
    PaymentsmadePageModule,
    PaymentsreceivedPageModule,
    ServerlessSendviewPageModule,
    ServerlessReceiveviewPageModule,
    ServerlessReceivePageModule,

    IonicModule.forRoot(MyApp, {
      mode: 'ios'}
      ),
IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['sqlite', 'indexeddb',  'websql']
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    EmailPage, 
    SignupPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Serverless, 
    File,
    FileOpener,
    Bitcoin, 
    ServerlessPayment, 
    ServerlessTransaction, 
    ServerlessWallet, 
    Popservice, 
    ShapeshiftProvider, 
    RegularEngine, 
    SocialSharing,
    Clipboard,
    EmailComposer,
    QRScanner,
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

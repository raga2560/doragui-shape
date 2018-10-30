import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessSendviewPage } from './serverless-sendview';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    ServerlessSendviewPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(ServerlessSendviewPage),
  ],
})
export class ServerlessSendviewPageModule {}

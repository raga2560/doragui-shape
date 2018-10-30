import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessReceivePage } from './serverless-receive';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    ServerlessReceivePage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(ServerlessReceivePage),
  ],
})
export class ServerlessReceivePageModule {}

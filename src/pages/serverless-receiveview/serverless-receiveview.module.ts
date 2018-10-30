import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessReceiveviewPage } from './serverless-receiveview';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    ServerlessReceiveviewPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(ServerlessReceiveviewPage),
  ],
})
export class ServerlessReceiveviewPageModule {}

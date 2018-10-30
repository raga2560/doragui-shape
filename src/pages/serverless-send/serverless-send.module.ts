import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessSendPage } from './serverless-send';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    ServerlessSendPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(ServerlessSendPage),
  ],
})
export class ServerlessSendPageModule {}

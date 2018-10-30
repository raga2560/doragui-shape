import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}

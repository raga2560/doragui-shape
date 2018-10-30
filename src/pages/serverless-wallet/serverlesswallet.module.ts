import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessWalletPage } from './serverlesswallet';

@NgModule({
  declarations: [
    ServerlessWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(ServerlessWalletPage),
  ],
})
export class ServerlessWalletPageModule {}

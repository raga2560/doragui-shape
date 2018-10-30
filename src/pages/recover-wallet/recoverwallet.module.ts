import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoverWalletPage } from './recoverwallet';

@NgModule({
  declarations: [
    RecoverWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoverWalletPage),
  ],
})
export class RecoverWalletPageModule {}

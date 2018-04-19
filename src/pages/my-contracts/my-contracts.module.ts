import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyContractsPage } from './my-contracts';

@NgModule({
  declarations: [
    MyContractsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyContractsPage),
  ],
})
export class MyContractsPageModule {}

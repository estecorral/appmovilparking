import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistParkingPage } from './regist-parking';

@NgModule({
  declarations: [
    RegistParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistParkingPage),
  ],
})
export class RegistParkingPageModule {}

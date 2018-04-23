import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleParkingPage } from './detalle-parking';

@NgModule({
  declarations: [
    DetalleParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleParkingPage),
  ],
})
export class DetalleParkingPageModule {}

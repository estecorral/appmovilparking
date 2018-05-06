import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovimientosEmpresaParkingPage } from './movimientos-empresa-parking';

@NgModule({
  declarations: [
    MovimientosEmpresaParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(MovimientosEmpresaParkingPage),
  ],
})
export class MovimientosEmpresaParkingPageModule {}

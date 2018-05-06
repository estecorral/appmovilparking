import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleMovimientoPage } from './detalle-movimiento';

@NgModule({
  declarations: [
    DetalleMovimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleMovimientoPage),
  ],
})
export class DetalleMovimientoPageModule {}

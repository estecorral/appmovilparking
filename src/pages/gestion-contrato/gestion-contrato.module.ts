import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionContratoPage } from './gestion-contrato';

@NgModule({
  declarations: [
    GestionContratoPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionContratoPage),
  ],
})
export class GestionContratoPageModule {}

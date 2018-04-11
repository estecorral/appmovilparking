import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistEntreprisePage } from './regist-entreprise';

@NgModule({
  declarations: [
    RegistEntreprisePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistEntreprisePage),
  ],
})
export class RegistEntreprisePageModule {}

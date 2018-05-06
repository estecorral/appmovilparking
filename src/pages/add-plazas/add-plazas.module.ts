import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlazasPage } from './add-plazas';

@NgModule({
  declarations: [
    AddPlazasPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlazasPage),
  ],
})
export class AddPlazasPageModule {}

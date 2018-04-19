import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEntreprisesPage } from './list-entreprises';

@NgModule({
  declarations: [
    ListEntreprisesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEntreprisesPage),
  ],
})
export class ListEntreprisesPageModule {}

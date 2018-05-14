import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AlertController} from "ionic-angular";
import {Reserva} from "../../models/reserva";
import {Empresa} from "../../models/empresa";
import {containerStart} from "@angular/core/src/render3/instructions";

/**
 * Generated class for the GestionContratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-contrato',
  templateUrl: 'gestion-contrato.html',
})
export class GestionContratoPage {

  reservaKey: string;
  reserva: Reserva;
  keyEmpresa: string;
  empresa: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController) {
    this.reservaKey = this.navParams.get('key');
    this.afDatabase.list('entreprises').valueChanges().subscribe( empresasData => {
      if(!empresasData){
        return;
      }
      for(let i=0; empresasData.length >= i; i++){
        if(empresasData[i] && (empresasData[i] as Empresa).key === this.keyEmpresa){
          this.empresa = empresasData[i];
        }
      }
      console.log(this.empresa);
    });
  }
  ionViewDidLoad(){
    this.afDatabase.list('reserva').snapshotChanges().subscribe( actions =>
      actions.forEach(action => {
        if(!action.payload.val()){
          console.log('No definido');
          return;
        }
        if(this.reservaKey === action.key){
          this.reserva = action.payload.val();
          this.keyEmpresa = action.payload.val().keyEmpresa;
          console.log(this.reserva);
          return;
        }
      }));
  }

  async estadoPendiente(estado: string) {
    if(estado === 'pendiente'){
      return true;
    } else {
      return false;
    }
  }

  confirmarContrato(){
    this.afDatabase.list('reserva').update(this.reservaKey, {estado: 'confirmada'});
    let alert = this.alertCtrl.create({
      title: 'Reserva confirmada',
      subTitle: 'La reserva se ha confirmado correctamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }
}

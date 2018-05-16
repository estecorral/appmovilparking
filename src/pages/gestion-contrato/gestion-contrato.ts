import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AlertController} from "ionic-angular";
import {Reserva} from "../../models/reserva";
import {Empresa} from "../../models/empresa";

/**
 *  Pagina de gestión de contratos, desde aquí se ve la información de una reserva y se confirman
 *  los contratos con las empresas
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
    // Recupera los datos de la reserva
    this.afDatabase.list('reserva').snapshotChanges().subscribe( actions =>
      actions.forEach(action => {
        if(!action.payload.val()){
          return;
        }
        this.reservaKey = this.navParams.get('key');
        if(this.reservaKey === action.key){
          this.reserva = action.payload.val();
          this.keyEmpresa = action.payload.val().keyEmpresa;
        }
      }));
    // Recupera los datos de las empresas
    this.afDatabase.list('entreprises').valueChanges().subscribe( empresasData => {
      if(!empresasData){
        return;
      }
      for(let i=0; empresasData.length >= i; i++){
        if(empresasData[i] && (empresasData[i] as Empresa).key === this.keyEmpresa){
          this.empresa = empresasData[i];
        }
      }
    });
  }
  ionViewDidLoad(){

  }

  // Comprueba el estado de una reserva para poder confirmarla
  async estadoPendiente(estado: string) {
    if(estado === 'pendiente'){
      return true;
    } else {
      return false;
    }
  }
// Función que una vez que confirmamos una reserva os muestra un alert de que se ha realizado correctamente
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

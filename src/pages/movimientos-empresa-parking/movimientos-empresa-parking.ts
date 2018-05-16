import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Págona de movimientos de la empresa en un parking
 *
 * Muestra los movimientos de una empresa en un parking concreto
 */

@IonicPage()
@Component({
  selector: 'page-movimientos-empresa-parking',
  templateUrl: 'movimientos-empresa-parking.html',
})
export class MovimientosEmpresaParkingPage {

  reserva: any;
  movimientos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
   // recupera la información de la reserva de la página anterior
    this.reserva = this.navParams.get('reserva');
    // Recupera la información de los movimientos de la emprea en un parking determinado
    this.afDatabase.list('entradas').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && this.reserva.keyParking === (data[i] as Movimiento).keyParking && data[i] &&
          this.reserva.keyEmpresa === (data[i] as Movimiento).keyEmpresa){
          this.movimientos.push(data[i]);
        }
      }
    });
  }

  ionViewDidLoad() {
  }
  // Función que comprueba el estado de una reserva
  reservaConfirmada() {
    if (this.reserva.estado === 'confirmada'){
      return true;
    } else {
      return false;
    }
  }
}

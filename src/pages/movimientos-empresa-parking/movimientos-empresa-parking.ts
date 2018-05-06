import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the MovimientosEmpresaParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    this.reserva = this.navParams.get('reserva');
    console.log(this.reserva);
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
      console.log(this.movimientos);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovimientosEmpresaParkingPage');
  }
  reservaConfirmada() {
    if (this.reserva.estado === 'confirmada'){
      return true;
    } else {
      return false;
    }
  }
}

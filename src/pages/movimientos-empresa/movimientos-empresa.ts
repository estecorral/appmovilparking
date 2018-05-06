import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";
import {DetalleMovimientoPage} from "../detalle-movimiento/detalle-movimiento";

/**
 * Generated class for the MovimientosEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movimientos-empresa',
  templateUrl: 'movimientos-empresa.html',
})
export class MovimientosEmpresaPage {
  reserva: any;
  movimientos = [];
  movimietosFecha = [];
  fecha: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    this.reserva = this.navParams.get('reserva');
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
    console.log('ionViewDidLoad MovimientosEmpresaPage');
  }
  reservaConfirmada() {
    if (this.reserva.estado === 'confirmada'){
      return true;
    } else {
      return false;
    }
  }
  datosMovimiento(movimiento: any){
    this.navCtrl.push(DetalleMovimientoPage, {movimiento});
  }
  filtro(){

  }
}

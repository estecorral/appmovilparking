import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Página detalle movimiento
 *
 * Se muestra la información de un movimiento, que puede ser de entrada o de salida
 *
 */

@IonicPage()
@Component({
  selector: 'page-detalle-movimiento',
  templateUrl: 'detalle-movimiento.html',
})
export class DetalleMovimientoPage {
  movimiento: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Recuperamos la información de la página de listado de movimientos del movimiento seleccionado
    this.movimiento = this.navParams.get('movimiento');
  }

  ionViewDidLoad() {
  }

}

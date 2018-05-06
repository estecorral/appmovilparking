import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleMovimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-movimiento',
  templateUrl: 'detalle-movimiento.html',
})
export class DetalleMovimientoPage {
  movimiento: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movimiento = this.navParams.get('movimiento');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleMovimientoPage');
  }

}

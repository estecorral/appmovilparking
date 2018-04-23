import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {ReservaPlazasPage} from "../reserva-plazas/reserva-plazas";

/**
 * Generated class for the DetalleParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-parking',
  templateUrl: 'detalle-parking.html',
})
export class DetalleParkingPage {
  parking: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDataBase: AngularFireDatabase) {
    this.parking = this.navParams.get('parking');
  }

  goReserva(parking){
    this.navCtrl.push(ReservaPlazasPage, {parking});
  }
}

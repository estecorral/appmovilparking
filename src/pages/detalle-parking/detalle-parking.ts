import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Recuperamos la información de la pagina de listado de parkings para mostrar la información del parking seleccionado
    this.parking = this.navParams.get('parking');
  }
// Función para navegar a la siguiente pagina de reservas de plazas en el parking mostrado, se envia la info del parking
  goReserva(parking){
    this.navCtrl.push(ReservaPlazasPage, {parking});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {GestionContratoPage} from "../gestion-contrato/gestion-contrato";
import {MovimientosEmpresaParkingPage} from "../movimientos-empresa-parking/movimientos-empresa-parking";

/**
 * Página de listado de empresa
 *
 *Desde esta página un usuario de parking puede ver las empresas que han realizado reservas en su parking y el
 * estado en el que se encuentran estas reservas
 */

@IonicPage()
@Component({
  selector: 'page-list-entreprises',
  templateUrl: 'list-entreprises.html',
})
export class ListEntreprisesPage {
  parking: any;
  claveParking: string;
  misReservas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private userAuth: AuthUserProvider) {
  // recupera la información del usuario autenticado
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.afDatabase.object(`userParking/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.parking = userData;
          this.claveParking = data.uid;
        });
    });
  }
  ionViewDidLoad() {
    // Recupera la información de las empreasas que tienen reservas en este parking
    this.afDatabase.list('reserva').snapshotChanges().subscribe( actions => {
      let i = 0;
      actions.forEach(action => {
        console.log(this.claveParking);
        if (this.claveParking === action.payload.val().keyParking) {
          this.misReservas[i] = action.payload.val();
          this.misReservas[i].key = action.key;
          i++;
        }
      });
    });
  }
  // Función para comprobar el estado de una reserva
  estadoReserva(reservaEstado: string){
    if(reservaEstado === 'pendiente'){
      return true;
    } else {
      return false;
    }
  }
  // Función para navegar a la pagina de gestión de contrato, envia la key de la reserva
  goGestionContrato(key: string){
    console.log(key);
   this.navCtrl.push(GestionContratoPage, {key});
  }
  // Función para navegar al listado de movimientos que tiene una empresa en nuestro parking
  goMovimientos(reserva: any){
    this.navCtrl.push(MovimientosEmpresaParkingPage, {reserva});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {MovimientosEmpresaPage} from "../movimientos-empresa/movimientos-empresa";

/**
 * Página de reservas de una empresa
 *
 * Muestra un listado con las reservas que ha realizado la empresa en los distintos parkings
 */

@IonicPage()
@Component({
  selector: 'page-my-reservations',
  templateUrl: 'my-reservations.html',
})
export class MyReservationsPage {

  reservas = [];
  userEntrepriseData: any;
  claveEmpresa: string;
  parkings: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDataBase: AngularFireDatabase,
              private userAuth: AuthUserProvider) {
    // Recupera la información del usuario autenticado
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      // Recupera los datos del perfil de la empresa autenticada
      this.afDataBase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
        });
    });

  }
  ionViewDidLoad() {
    // Recupera lo datos de las reservas realizadas por la empresa en los distintos parkings
    this.afDataBase.list('reserva').valueChanges().subscribe( reservasData => {
      if(!reservasData){
        return;
      }
      let j = 0;
      for(let i=0; reservasData.length >= i; i++){
        if(reservasData[i] && (reservasData[i] as Reserva).keyEmpresa === this.claveEmpresa) {
          this.reservas[j] = reservasData[i];
          j++;
        }
      }
    });
  }
  // Navega a la página de movimientos de la empresa en un determinado parking
  reservaMovimientos(reserva: any){
    this.navCtrl.push(MovimientosEmpresaPage, {reserva});
  }
}

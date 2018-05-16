import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Página de contratos de una empresa con un parking
 *
 * Muestra los contratos que se han generado al confirmar una reserva un parking y su información
 */

@IonicPage()
@Component({
  selector: 'page-my-contracts',
  templateUrl: 'my-contracts.html',
})
export class MyContractsPage {
  reservas = [];
  userEntrepriseData: any;
  claveEmpresa: string;
  parkings: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth: AuthUserProvider,
              private afDatabase: AngularFireDatabase) {
   // Recupera la información del usuario autenticado
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      // Recupera la información del usuario empresa
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
        });
    });
  }

  ionViewDidLoad() {
    // Recupera la información de las reservas que tiene un usuario, si estan confirmadas recupera la información en formato contrato
    this.afDatabase.list('reserva').valueChanges().subscribe( reservasData => {
      if(!reservasData){
        return;
      }
      let j = 0;
      for(let i=0; reservasData.length >= i; i++){
        if(reservasData[i] && (reservasData[i] as Reserva).keyEmpresa === this.claveEmpresa &&
          (reservasData[i] as Reserva).estado === 'confirmada' ){
          this.reservas[j] = reservasData[i];
          j++;
        }
      }
    });
  }

}

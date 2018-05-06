import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {MovimientosEmpresaPage} from "../movimientos-empresa/movimientos-empresa";

/**
 * Generated class for the MyReservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.afDataBase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
        });
    });

  }
  ionViewDidLoad() {
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
  reservaMovimientos(reserva: any){
    this.navCtrl.push(MovimientosEmpresaPage, {reserva});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAction, AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {GestionContratoPage} from "../gestion-contrato/gestion-contrato";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ListEntreprisesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    afDatabase.list('reserva').snapshotChanges().subscribe( actions => {
      let i = 0;
      actions.forEach(action => {
        // console.log(action.key);
        if (this.claveParking === action.payload.val().keyParking) {
          this.misReservas[i] = action.payload.val();
          this.misReservas[i].key = action.key;
          i++;
        }
        // console.log(this.misReservas);
      })
    });
  }
  estadoReserva(reservaEstado: string){
    if(reservaEstado === 'pendiente'){
      return true;
    } else {
      return false;
    }
  }

  goGestionContrato(key: string){
    console.log(key);
   this.navCtrl.push(GestionContratoPage, {key});
  }
}

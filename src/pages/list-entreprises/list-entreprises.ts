import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";

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
  reservas= [];
  claveParking: string;

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

  }

  ionViewDidLoad() {
    this.afDatabase.list('reserva').valueChanges().subscribe( reservasData => {
      if(!reservasData){
        return;
      }
      let j = 0;
      for(let i=0; reservasData.length >= i; i++) {
        if(reservasData[i] && (reservasData[i] as Reserva).keyParking === this.claveParking){
          this.reservas[j] = reservasData[i];
          j++;
        }
      }
    });
  }
  estadoReserva(reservaEstado: string){
    if(reservaEstado === 'pendiente'){
      return true;
    } else {
      return false;
    }
  }
}

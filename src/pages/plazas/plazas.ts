import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Parking} from "../../models/parking";

/**
 * Página con las plazas del parking
 *
 * Muesta las plazas del parking y su estado
 */

@IonicPage()
@Component({
  selector: 'page-plazas',
  templateUrl: 'plazas.html',
})
export class PlazasPage {

  keyParking: string;
  parking: any;
  plazas = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {
    // recupera la información del usuario autenticado
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
    });
    // Recupera la información del perfil del parking
    this.afDatabase.list('parkings').valueChanges().subscribe(data => {
      data.forEach(parking => {
        if (this.keyParking === (parking as Parking).key){
           this.parking = parking;
           this.plazas = this.parking.plazas;
           console.log(this.plazas);
           return;
        }
      });
    })
  }

  ionViewDidLoad() {
    this.afDatabase.list('parkings').valueChanges().subscribe(data => {
      console.log(data);
    })
  }
  estadoPlaza(estado){
    if(estado === 'libre'){
      return true;
    }
  }
}

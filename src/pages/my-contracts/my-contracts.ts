import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Reserva} from "../../models/reserva";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the MyContractsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
        });
    });
  }

  ionViewDidLoad() {
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

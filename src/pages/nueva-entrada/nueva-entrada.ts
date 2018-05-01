import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Movimiento} from "../../models/movimiento";
import {EntradasPage} from "../entradas/entradas";

/**
 * Generated class for the NuevaEntradaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-entrada',
  templateUrl: 'nueva-entrada.html',
})
export class NuevaEntradaPage {
  keyParking: string;
  keyEmpresa: string;
  reservas = [];
  entrada = {} as Movimiento;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    this.keyParking = this.navParams.get('keyParking');
    console.log(this.keyParking);
    afDatabase.list('reserva').snapshotChanges().subscribe( actions => {
      let i = 0;
      actions.forEach(action => {
        // console.log(action.key);
        if (this.keyParking === action.payload.val().keyParking && action.payload.val().estado === 'confirmada') {
          this.reservas[i] = action.payload.val();
          this.keyEmpresa = action.payload.val().keyEmpresa;
          i++;
        }
        // console.log(this.reservas);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaEntradaPage');
  }

  nuevaEntrada(){
    this.entrada.keyEmpresa = this.keyEmpresa;
    this.entrada.keyParking = this.keyParking;
    console.log(this.entrada);
    this.afDatabase.list('entradas').push(this.entrada);
    this.navCtrl.push(EntradasPage);
  }
}

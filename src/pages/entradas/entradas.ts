import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {NuevaEntradaPage} from "../nueva-entrada/nueva-entrada";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Movimiento} from "../../models/movimiento";

/**
 * Generated class for the EntradasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entradas',
  templateUrl: 'entradas.html',
})
export class EntradasPage {

  parking: any;
  keyParking: string;
  movimientos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {

  }

  ionViewDidLoad() {
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
    });
    this.afDatabase.list('entradas').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && (data[i] as Movimiento).keyParking === this.keyParking && (data[i] as Movimiento).tipo === 'in') {
          this.movimientos.push(data[i]);
        }
      }
      console.log(this.movimientos);
    });
  }

  addEntrada(keyParking: string){
    this.navCtrl.push(NuevaEntradaPage, {keyParking});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {AngularFireDatabase} from "angularfire2/database";
import {NuevaSalidaPage} from "../nueva-salida/nueva-salida";

/**
 * Generated class for the SalidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas',
  templateUrl: 'salidas.html',
})
export class SalidasPage {
  parking: any;
  keyParking: string;
  movimientos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private authUser: AuthUserProvider,
              private afDatabase: AngularFireDatabase) {
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
        if(data[i] && (data[i] as Movimiento).keyParking === this.keyParking && (data[i] as Movimiento).tipo === 'out') {
          this.movimientos.push(data[i]);
        }
      }
      console.log(this.movimientos);
    });
  }

  addSalida(keyParking: string){
    this.navCtrl.push(NuevaSalidaPage, {keyParking});
  }
}

/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {AngularFireDatabase} from "angularfire2/database";
import {NuevaSalidaPage} from "../nueva-salida/nueva-salida";

/**
 * Página de movimientos de salida de un parking
 *
 * Muesta el listado de todas las salidad del parking
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
    // recupera la información del usuario autenticado
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
    });
    // Recoge la información de los movientos de salida de la base de datos para  listarla
    this.afDatabase.list('movimientos').valueChanges().subscribe(data => {
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
// Función que navega a la página de añadir nueva salida.
  addSalida(keyParking: string){
    this.navCtrl.push(NuevaSalidaPage, {keyParking});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {NuevaEntradaPage} from "../nueva-entrada/nueva-entrada";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Movimiento} from "../../models/movimiento";

/**
 * Página de entradas
 *
 * Desde aquí se visualizan todas las entradas en el parking y se pueden añadir nuevas entradas
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
  plazas = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {

  }

  ionViewDidLoad() {
    // Recuperamos la clave del usuario del parking que esta autenticado
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
    });
    // Recuperamos los datos de los movimientos de entrada que tiene el parking que esta autenticado actualmente
    this.afDatabase.list('movimientos').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && (data[i] as Movimiento).keyParking === this.keyParking && (data[i] as Movimiento).tipo === 'in') {
          this.movimientos.push(data[i]);
        }
      }
    });
  }
  // Función para navegar a la página para añadir una nueva entrada
  addEntrada(keyParking: string){
    this.navCtrl.push(NuevaEntradaPage, {keyParking});
  }
}

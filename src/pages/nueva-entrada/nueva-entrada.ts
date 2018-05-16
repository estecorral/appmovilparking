import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Movimiento} from "../../models/movimiento";
import {EntradasPage} from "../entradas/entradas";

/**
 * Página Nueva entrada
 *
 * Página en la que se muestra un nuevo formulario para añadir una nueva entrada, nos pide seleccionar las empresas
 * en la selección solo se mostrara las empresas que tengan un contrato confirmado con la empresa
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
    // Recoge la información de la pagina anterior con la clave del parking en el que se va a registrar el movimiento
    this.keyParking = this.navParams.get('keyParking');
    // recupera la información de las reservas confirmadas para compronar las empresas que tienen la reserva confirmada
    afDatabase.list('reserva').snapshotChanges().subscribe( actions => {
      let i = 0;
      actions.forEach(action => {
        if (this.keyParking === action.payload.val().keyParking && action.payload.val().estado === 'confirmada') {
          this.reservas[i] = action.payload.val();
          i++;
        }
      })
    });
  }

  ionViewDidLoad() {
  }
  // Guarda la clave de la empresa para la que registramos una nueva entrada
  saveKeyEmpresa(key){
    this.keyEmpresa = key;
  }
  // registra la nueva entrada en base de datos
  nuevaEntrada(){
    this.entrada.keyEmpresa = this.keyEmpresa;
    this.entrada.keyParking = this.keyParking;
    this.entrada.tipo = 'in';
    console.log(this.entrada);
    this.afDatabase.list('entradas').push(this.entrada);
    this.navCtrl.push(EntradasPage);
  }
}

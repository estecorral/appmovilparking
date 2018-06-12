/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Págona de movimientos de la empresa en un parking
 *
 * Muestra los movimientos de una empresa en un parking concreto
 */

@IonicPage()
@Component({
  selector: 'page-movimientos-empresa-parking',
  templateUrl: 'movimientos-empresa-parking.html',
})
export class MovimientosEmpresaParkingPage {
  @ViewChild('picker') datepicker;
  reserva: any;
  movimientos = [];
  movimietosFecha = [];
  fecha: Date;
  allMovs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
   // recupera la información de la reserva de la página anterior
    this.reserva = this.navParams.get('reserva');
    // Recupera la información de los movimientos de la emprea en un parking determinado
    this.afDatabase.list('movimientos').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && this.reserva.keyParking === (data[i] as Movimiento).keyParking && data[i] &&
          this.reserva.keyEmpresa === (data[i] as Movimiento).keyEmpresa){
          this.movimientos.push(data[i]);
        }
      }
      this.allMovs = this.movimientos;
    });
  }

  ionViewDidLoad() {
  }
  // Función que comprueba el estado de una reserva
  reservaConfirmada() {
    if (this.reserva.estado === 'confirmada'){
      return true;
    } else {
      return false;
    }
  }
  filtro(){
    this.movimientos = this.allMovs;
    this.movimietosFecha = [];
    for(let i = 0; i < this.movimientos.length; i++){
      if(this.movimientos[i].fechaEntrada === this.fecha){
        this.movimietosFecha.push(this.movimientos[i]);
      }
    }
    this.movimientos = this.movimietosFecha;
  }
}

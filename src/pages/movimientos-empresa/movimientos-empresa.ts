/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";
import {DetalleMovimientoPage} from "../detalle-movimiento/detalle-movimiento";
import {FormControl} from "@angular/forms";

/**
 * Página de movimientos de una empresa
 *
 * Muesta los movimientos de una empresa en un parking, permite el filtrado de movimientos por fecha
 */

@IonicPage()
@Component({
  selector: 'page-movimientos-empresa',
  templateUrl: 'movimientos-empresa.html',
})

export class MovimientosEmpresaPage {
  @ViewChild('picker') datepicker;
  reserva: any;
  movimientos = [];
  movimietosFecha = [];
  fecha: Date;
  allMovs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    // Recupera los datos de la reserva de la página anterior
    this.reserva = this.navParams.get('reserva');
    // Recupera los datos de las entradas de la empresa en el parking
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
  // Función para comprobar el estado de una reserva
  reservaConfirmada() {
    if (this.reserva.estado === 'confirmada'){
      return true;
    } else {
      return false;
    }
  }
  // Navega a la página que muestra el detalle de un movimiento seleccionado, envia la información de este
  datosMovimiento(movimiento: any){
    this.navCtrl.push(DetalleMovimientoPage, {movimiento});
  }
  // Función para filtrar movimientos por fecha
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

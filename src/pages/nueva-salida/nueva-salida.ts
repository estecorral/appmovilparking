import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";
import {SalidasPage} from "../salidas/salidas";

/**
 * Página de registro de una nueva salida
 *
 * Formulario para registrar las salidad del parking, en primer lugar se ha de seleccionar la matricula del camión, solo
 * se muestran las matriculas de los camiones que se encuentran dentro del parking, y después se completa la información
 * para registrar la información.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-salida',
  templateUrl: 'nueva-salida.html',
})
export class NuevaSalidaPage {
  keyParking: string;
  keyEmpresa: string;
  movimientos = [];
  entrada = {} as Movimiento;
  salida = {} as Movimiento;
  movimientoSalida: any;
  movimientoKey: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController) {
    // Recibe la clave del parking desde el que que vamos a registrar la salida
    this.keyParking = this.navParams.get('keyParking');
    // Recupera la información de movimientos que están dentro del parking
    this.afDatabase.list('movimientos').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && this.keyParking === (data[i] as Movimiento).keyParking && (data[i] as Movimiento).tipo === 'in'){
          this.movimientos.push(data[i]);
        }
      }
    });

  }

  ionViewDidLoad() {

  }
  // Función que guarda los movientos de salida para despues mostrarlos
  mostrarDatosMovimiento(movimiento: any) {
    this.movimientoSalida = movimiento;
  }
// Registra en la base de datos la nueva salida con toda la información, lo que realmente se realiza es una actualización
//  de una entrada modificando su estado de in a out para indicar que el movimiento es una salida.
  nuevaSalida() {
    console.log(this.salida);
    this.afDatabase.list('entradas').snapshotChanges().subscribe( actions =>
      actions.forEach(action => {
        console.log(action.payload.val().matriculaCamion);
        console.log(this.salida.matriculaCamion);
        if(this.salida.matriculaCamion === action.payload.val().matriculaCamion && this.salida.tipo === 'in'){
          this.movimientoKey = action.key;
          console.log(this.movimientoKey);
          this.afDatabase.list('movimientos').update(this.movimientoKey, {
            matriculaSemiremolqueSalida: this.salida.matriculaSemiremolqueSalida,
            nombreTransportistaSalida: this.salida.nombreTransportistaSalida,
            dniTranportistaSalida: this.salida.dniTranportistaSalida,
            fechaSalida: this.movimientoSalida.fechaSalida,
            tipo: 'out'
          });
          return;
        }
      })
    );
    let alert = this.alertCtrl.create({
      title: 'Salida guardada',
      subTitle: 'La salida se ha registrado correctamente',
      buttons: ['Aceptar']
    });
    alert.present();
    this.navCtrl.setRoot(SalidasPage);
  }
}

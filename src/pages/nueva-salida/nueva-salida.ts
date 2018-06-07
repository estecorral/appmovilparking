import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  plazas = [];
  keyPark: string;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController, public fb: FormBuilder) {
    // Recibe la clave del parking desde el que que vamos a registrar la salida
    this.keyParking = this.navParams.get('keyParking');
    // Comprueba datos introducidos en el formulario
    this.form = this.fb.group({
      fechaSalida: new FormControl('', Validators.required),
      horaSalida: new FormControl('', Validators.required),
      semiremolque: new FormControl('', Validators.required),
      transportista: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required)
    });
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
    // Recupera la información del perfil del parking
    this.afDatabase.list('parkings').snapshotChanges().subscribe(parkings => {
      parkings.forEach(parking => {
        if (this.keyParking === parking.payload.val().key){
          this.plazas = parking.payload.val().plazas;
          this.keyPark = parking.key;
          return;
        }
      });
    });
  }
  // Función que guarda los movientos de salida para despues mostrarlos
  mostrarDatosMovimiento(movimiento: any) {
    this.movimientoSalida = movimiento;
  }
// Registra en la base de datos la nueva salida con toda la información, lo que realmente se realiza es una actualización
//  de una entrada modificando su estado de in a out para indicar que el movimiento es una salida.
  nuevaSalida() {
    this.afDatabase.list('movimientos').snapshotChanges().subscribe( actions =>
      actions.forEach(action => {
        if(this.salida.matriculaCamion === action.payload.val().matriculaCamion && this.salida.tipo === 'in'){
          this.movimientoKey = action.key;
          console.log(this.movimientoKey);
          this.afDatabase.list('movimientos').update(this.movimientoKey, {
            matriculaSemiremolqueSalida: this.salida.matriculaSemiremolqueSalida,
            nombreTransportistaSalida: this.salida.nombreTransportistaSalida,
            dniTranportistaSalida: this.salida.dniTranportistaSalida,
            fechaSalida: this.movimientoSalida.fechaSalida,
            horaSalida: this.movimientoSalida.horaSalida,
            tipo: 'out'
          });
          return;
        }
      })
    );
    let plazaOut = parseInt(this.salida.plaza) - 1;
    this.afDatabase.object(`parkings/${this.keyPark}/plazas/${plazaOut}`).update({estado: 'libre'});
    let alert = this.alertCtrl.create({
      title: 'Salida guardada',
      subTitle: 'La salida se ha registrado correctamente',
      buttons: ['Aceptar']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);
  }
}

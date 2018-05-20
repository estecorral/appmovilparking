import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Movimiento} from "../../models/movimiento";
import {HomePage} from "../home/home";

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
  plazas = [];
  plazasLibres = [];
  keyPark: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController) {
    // Recoge la información de la pagina anterior con la clave del parking en el que se va a registrar el movimiento
    this.keyParking = this.navParams.get('keyParking');
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

    // recupera la información de las reservas confirmadas para compronar las empresas que tienen la reserva confirmada
    this.afDatabase.list('reserva').snapshotChanges().subscribe( actions => {
      let i = 0;
      actions.forEach(action => {
        if (this.keyParking === action.payload.val().keyParking && action.payload.val().estado === 'confirmada') {
          this.reservas[i] = action.payload.val();
          i++;
        }
        this.buscarPlazasLibres();
      })
    });
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
    this.afDatabase.list('movimientos').push(this.entrada);
    this.actualizarEstadoPlaza(this.entrada.plaza);
    this.afDatabase.list(`parkings`).update(this.keyPark, {plazas: this.plazas});
    let alert = this.alertCtrl.create({
      title: 'Entrada registrada',
      subTitle: 'La entrada se ha registrado correctamente',
      buttons: ['Aceptar']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);
  }
  // Función para listar solo las plazas que estan libres en la selección de plaza al registrar entrada
  buscarPlazasLibres(){
    let j = 0;
    for(let i = 0; i < this.plazas.length; i++){
      if(this.plazas[i].estado === 'libre') {
        this.plazasLibres[j] = this.plazas[i];
        j++;
      }
    }
  }
  // Actualiza el estado de las plazas al entrar un camión en una entrada
  actualizarEstadoPlaza(plaza){
    for(let i = 0; i < this.plazas.length; i++) {
      if(i = plaza - 1) {
        this.plazas[i] = {
          estado: 'ocupada',
          numero: plaza
        }
        return;
      }
    }
  }
}

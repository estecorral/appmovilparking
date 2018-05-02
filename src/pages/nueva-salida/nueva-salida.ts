import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Movimiento} from "../../models/movimiento";
import {AngularFireDatabase} from "angularfire2/database";
import {SalidasPage} from "../salidas/salidas";

/**
 * Generated class for the NuevaSalidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    this.keyParking = this.navParams.get('keyParking');
    this.afDatabase.list('entradas').valueChanges().subscribe(data => {
      if(!data){
        return;
      }
      for(let i = 0; data.length >= i; i++){
        if(data[i] && this.keyParking === (data[i] as Movimiento).keyParking && (data[i] as Movimiento).tipo === 'in'){
          this.movimientos.push(data[i]);
        }
      }
      console.log(this.movimientos);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaSalidaPage');
  }
  mostrarDatosMovimiento(movimiento: any) {
    this.movimientoSalida = movimiento;
    console.log(this.movimientoSalida);
  }

  nuevaSalida() {
    console.log(this.salida);
    this.afDatabase.list('entradas').snapshotChanges().subscribe( actions =>
      actions.forEach(action => {
        console.log(action.payload.val().matriculaCamion);
        console.log(this.salida.matriculaCamion);
        if(this.salida.matriculaCamion === action.payload.val().matriculaCamion && this.salida.tipo === 'in'){
          this.movimientoKey = action.key;
          console.log(this.movimientoKey);
          this.afDatabase.list('entradas').update(this.movimientoKey, {
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

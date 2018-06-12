/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Reserva} from "../../models/reserva";
import {Empresa} from "../../models/empresa";
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Página para la reserva de plazas
 *
 *  Permite la reserva de plazas de una empresa en un determinado parking
 */

@IonicPage()
@Component({
  selector: 'page-reserva-plazas',
  templateUrl: 'reserva-plazas.html',
})
export class ReservaPlazasPage {

  parking: any;
  userEntrepriseData: any;
  empresa: any;
  claveEmpresa: string;
  telefono: string;
  reserva= {} as Reserva;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth: AuthUserProvider,
             private afDatabase: AngularFireDatabase, public fb: FormBuilder ) {
    // recoge la información del parking de la página anterior
    this.parking = this.navParams.get('parking');
    // Comprueba que los datos de los formularios son correctos:
    this.form = this.fb.group( {
      numPlazas: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      contacto: new FormControl('', Validators.required),
      observaciones: ''
    });
    // Recupera la información del usuario autenticado
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
        });
      // Recupera la información de la empresa que realiza la reserva
      this.afDatabase.list('entreprises').valueChanges().subscribe( empresas => {
        empresas.forEach(empresa => {
          if(this.claveEmpresa === (empresa as Empresa).key){
            this.empresa = empresa;
            return;
          }
        });
      });
    });
  }
  ionViewDidLoad() {

  }
// Guarda en base de datos la solicitud de reserva de plazas
  reservar(){
      this.reserva.keyEmpresa = this.claveEmpresa;
      this.reserva.keyParking = this.parking.key;
      this.reserva.nombreParking = this.parking.name;
      this.reserva.nombreEmpresa = this.empresa.nombre;
      this.reserva.estado = 'pendiente';
      this.afDatabase.list('reserva').push(this.reserva);
      this.navCtrl.setRoot(HomePage);
    }
}

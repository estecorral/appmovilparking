import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserParking} from "../../models/userParking";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {Role} from "../../enum/role.enum";
import {Parking} from "../../models/parking";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Página de registro de datos del perfil del parking
 *
 * Formulario para guardar la información del perfil del parking
 */

@IonicPage()
@Component({
  selector: 'page-regist-parking2',
  templateUrl: 'regist-parking2.html',
})
export class RegistParking2Page {

  userParking = {} as UserParking;
  parking = {} as Parking;
  clave : string;
  email: string;
  name: string;
  numPlazas: number;
  plazas = [];
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              private afDatabase: AngularFireDatabase, public fb: FormBuilder) {
    //Comprobaciones de datos del formulario:
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])),
      plazas: new FormControl('', Validators.required)
    });
  }
 // Guarda en base de datos la información del perfil del parking
  createProfile() {
    this.userParking.role = Role.parking;
    this.authPark.authState.take(1).subscribe(auth => {
      this.clave = auth.uid;
      this.email = auth.email;
      this.name = this.userParking.name;
      this.afDatabase.object(`userParking/${auth.uid}`)
        .set(this.userParking).then(() => this.navCtrl.push('LoginPage'));
      this.createParking();
    });
  }
  createParking() {
    this.parking.key = this.clave;
    this.parking.email = this.email;
    this.parking.name = this.name;
    this.pushPlazas();
    this.parking.plazas = this.plazas;
    this.parking.localidad = this.parking.localidad.toLowerCase();
    this.afDatabase.list(`parkings`).push(this.parking);
  }
  // Genera array de estado de las plazas según el número de plazas indicado por el usuario
  pushPlazas(){
    for (let i = 0; i < this.numPlazas; i++){
      this.plazas[i] = ({
        numero: i+1,
        estado: 'libre'
      });
    }
  }

}

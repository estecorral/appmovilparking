/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import {LoginPage} from "../login/login";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Página de registro de una parking
 *
 * Formulario para registrar el usuario parking, en un segundo paso se registra la información del perfil
 */
@IonicPage()
@Component({
  selector: 'page-regist-parking',
  templateUrl: 'regist-parking.html',
})
export class RegistParkingPage {
  user = {} as User;
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              public alertCtrl: AlertController, public fb: FormBuilder) {
    // Comprobaciones de los datos del formulario
    this.form = this.fb.group({
      email: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

 async registUser(user: User){
    // Llama al servicio de FireAuth para registrar al usuario parking y navega a la página para registrar los datos de
   // perfil del parking.
   try {
     const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
     if(result) {
       this.navCtrl.push('RegistParking2Page');
     }
   }
   catch (e) {
     let alert = this.alertCtrl.create({
       title: 'Parámetros Incorrectos',
       subTitle: 'Los parámetros introducidos son incorrectos',
       buttons: ['Aceptar']
     });
     alert.present();
   }
  }
  returnLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}

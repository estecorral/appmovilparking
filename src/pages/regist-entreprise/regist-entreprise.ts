/*
Autor: Esteban Corral González
Trabajo Final de Grado de Ingenieria Infomática de la UOC
Esta obra está sujeta a una licencia de Reconocimiento-NoComercial-SinObraDerivada 3.0 España de Creative Commons
*/
import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Página de registro de una empresa
 *
 * Formulario para registrar el usuario empresa, en un segundo paso se registra la información del perfil
 */

@IonicPage()
@Component({
  selector: 'page-regist-entreprise',
  templateUrl: 'regist-entreprise.html',
})
export class RegistEntreprisePage {

  user = {} as User;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              public alertCtrl: AlertController, public fb: FormBuilder) {
    //Comprobaciones de datos del formulario:
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
  async registUser(user: User) {
    // Registra el usuario empresa y nos envia a la siguiente página en la que se registra la información del perfil
    try {
      const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      if(result) {
        this.navCtrl.push('RegistEntreprise2Page');
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

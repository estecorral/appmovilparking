import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth) {
  }

  async registUser(user: User) {
    // Registra el usuario empresa y nos envia a la siguiente página en la que se registra la información del perfil
    const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(()=> this.navCtrl.push('RegistEntreprise2Page'));
    console.log(result);
  }
}

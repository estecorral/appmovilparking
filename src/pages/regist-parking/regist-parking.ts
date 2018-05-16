import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth) {
  }

 async registUser(user: User){
    // Llama al servicio de FireAuth para registrar al usuario parking y navega a la página para registrar los datos de
   // perfil del parking.
   const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
     .then(()=> this.navCtrl.push('RegistParking2Page'));
   console.log(result);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserEntreprise} from "../../models/userEntreprise";
import {UserParking} from "../../models/userParking";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private globarAuth: AngularFireAuth) {
  }
  async login(user :User) {
    try {
      const result = this.globarAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.setRoot('HomePage');
    }
    catch (e){
      console.error(e);
    }
  }

  registNewParking(){
    this.navCtrl.push('RegistParkingPage');
  }

  registNewEntreprise(){
    this.navCtrl.push('RegistEntreprisePage');
  }
}

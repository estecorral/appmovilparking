import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserEntreprise} from "../../models/userEntreprise";
import {UserParking} from "../../models/userParking";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userEntreprise = {} as UserEntreprise;
  userParking = {} as UserParking;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  login(){

  }

  registNewParking(){
    this.navCtrl.push('RegistParkingPage');
  }

  registNewEntreprise(){
    this.navCtrl.push('RegistEntreprisePage');
  }
}

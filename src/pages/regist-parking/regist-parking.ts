import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import {RegistParking2Page} from "../regist-parking2/regist-parking2";

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
   const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
     .then(()=> this.navCtrl.push('RegistParking2Page'));
   console.log(result);
  }
}

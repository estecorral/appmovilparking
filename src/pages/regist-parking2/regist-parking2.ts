import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserParking} from "../../models/userParking";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {Role} from "../../enum/role.enum";

/**
 * Generated class for the RegistParking2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-parking2',
  templateUrl: 'regist-parking2.html',
})
export class RegistParking2Page {

  userParking = {}as UserParking;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
  }

  createProfile() {
    this.userParking.role = Role.parking;
    console.log(this.userParking);
    this.authPark.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`userParking/${auth.uid}`)
        .push(this.userParking).then(() => this.navCtrl.push('LoginPage'));
    });
  }
}

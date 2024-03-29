import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserParking} from "../../models/userParking";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {Role} from "../../enum/role.enum";
import {Parking} from "../../models/parking";

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

  userParking = {} as UserParking;
  parking = {} as Parking;
  clave : string;
  email: string;
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
  }

  createProfile() {
    this.userParking.role = Role.parking;
    console.log(this.userParking);
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
    this.afDatabase.list(`parkings`).push(this.parking);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Role} from "../../enum/role.enum";
import {UserEntreprise} from "../../models/userEntreprise";

/**
 * Generated class for the RegistEntreprise2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-entreprise2',
  templateUrl: 'regist-entreprise2.html',
})
export class RegistEntreprise2Page {
  userEntreprise = {}as UserEntreprise;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authPark: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
  }

  createProfile() {
    this.userEntreprise.role = Role.entreprise;
    console.log(this.userEntreprise);
    this.authPark.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`userEntreprise/${auth.uid}`)
        .push(this.userEntreprise).then(() => this.navCtrl.push('LoginPage'));
    });
  }
}

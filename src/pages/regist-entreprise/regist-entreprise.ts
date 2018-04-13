import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import { RegistEntreprise2Page} from "../regist-entreprise2/regist-entreprise2";

/**
 * Generated class for the RegistEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    const result = this.authPark.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(()=> this.navCtrl.push('RegistEntreprise2Page'));
    console.log(result);
  }
}

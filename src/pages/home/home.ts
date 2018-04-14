import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {UserEntreprise} from "../../models/userEntreprise";
import {UserParking} from "../../models/userParking";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  userParkingData: Observable <any>;
  userEntrepriseData: Observable <any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private userAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
  }

  ionViewWillLoad() {
    this.userAuth.authState.subscribe(data =>{
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();

      this.userParkingData = this.afDatabase.object(`userParking/${data.uid}`).valueChanges();
     this.userEntrepriseData = this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges();
      console.log('Userparking', this.userParkingData);
      console.log('UserEntreprise', this.userEntrepriseData);
    });
  }

}

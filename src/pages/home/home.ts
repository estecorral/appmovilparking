import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {LoginPage} from "../login/login";
import {ParkingListPage} from "../parking-list/parking-list";

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

  userParkingData: {};
  userEntrepriseData: {};
  clave: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private userAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {

    this.userAuth.authState.subscribe(data => {
     this.afDatabase.object(`userParking/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userParkingData = userData;
        });
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
        });
    });

  }

  ionViewWillLoad() {
    this.userAuth.authState.subscribe(data =>{
      this.clave = data.uid;
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();
    });
  }

  logOut(){
    this.navCtrl.setRoot(LoginPage);
  }

  buscarParking(){
    this.navCtrl.push('ParkingListPage');
  }
}

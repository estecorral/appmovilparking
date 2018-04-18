import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { UserParkingProvider} from "../../providers/user-parking/user-parking";
import { UserEntrepriseProvider} from "../../providers/user-entreprise/user-entreprise";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserParking} from "../../models/userParking";
import {UserEntreprise} from "../../models/userEntreprise";

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

  userParkingData: UserParking;
  userEntrepriseData: UserEntreprise;
  clave: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private userAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase, private _userParking: UserParkingProvider,
              private _userEntreprise: UserEntrepriseProvider) {

  }

  ionViewWillLoad() {
    this.userAuth.authState.subscribe(data =>{
      this.clave = data.uid;
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();
      //this.userParkingData = this.afDatabase.object(`userParking/${data.uid}`).valueChanges();
      //this.userEntrepriseData = this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges();
      /*this.userParking = this.afDatabase.object(`userParking/${data.uid}`);
      this.userEntreprise = this.afDatabase.object(`userEntreprise/${data.uid}`);
      this.userParking.snapshotChanges().subscribe(user => {
        console.log('LALALA',user.type);
        console.log(user.key);
        console.log(user.payload.val().direccion);
      });
      this.userEntreprise.snapshotChanges().subscribe(user => {
        console.log('LELELEEMPRESA: ', user.payload.val().role);
      })
      console.log('Userparking', this.userParkingData);
      console.log('UserEntreprise', this.userEntrepriseData);*/
    });
  }
  esParking(){
    this._userParking.verificaParking(this.clave)
      .then( existe => {

      });
    /*this._userParking.verificaParking(this.clave).valueChanges().subscribe( userData => {
      this.userParkingData = userData;
      console.log(this.userParkingData);
    });*/
  }

  esEmpresa(){
    return this._userEntreprise.verificaEmpresa(this.clave);
  }
 /* usuarioParking(){
    this._userParking.verificaParking(this.clave).valueChanges().subscribe( userData => {
      this.userParkingData = userData;
      console.log(this.userParkingData);
    });
  }

  usuarioEmpresa(){

  }
*/
}

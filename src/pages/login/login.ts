import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import { HomePage } from "../home/home";
import {globAll} from "@ionic/app-scripts/dist/util/glob-util";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private globarAuth: AngularFireAuth,
              public alertCtrl: AlertController, private authUser: AuthUserProvider,
              private loadingCtrl: LoadingController, private afDatabase: AngularFireDatabase) {
  }
  async login(user :User) {
    try {
      const result = await this.globarAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result) {
        this.navCtrl.setRoot('HomePage');
      }
    }
    catch (e){
      let alert = this.alertCtrl.create({
        title: 'Error en el login',
        subTitle: e,
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  registNewParking(){
    this.navCtrl.push('RegistParkingPage');
  }

  registNewEntreprise(){
    this.navCtrl.push('RegistEntreprisePage');
  }
  recuperarPass(){
    let alert = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      subTitle: 'Introduce el correo electronico de tu cuenta, te enviaremos una nueva contraseña',
      inputs: [
        {
          name: 'recuperaEmail',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            this.authUser.recuperaPass(data.recuperaEmail).then(() => {
              let alert = this.alertCtrl.create({
                title: 'Contraseña enviada',
                subTitle: 'Se ha enviado una nueva contraseña a su correo electronico',
                buttons: ['Aceptar']
              });
              alert.present();
            }).catch(e => {
              let alert = this.alertCtrl.create({
                title: 'Error al recuperar contraseña',
                subTitle: e,
                buttons: ['Aceptar']
              });
              alert.present();
            })
            ;
            }
          }
      ]
    }).present();
  }
}

import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";

/**
 * Página inicial de login de los usuarios.
 *
 * Desde esta página si tenemos un usuario podrémos acceder con nuestro perfil de usuario, en caso contrario tenemos
 * las opciones de registrarnos en la apliccación según el tipo de usuario que seamos, empresa o parking.
 * También en el caso de habernos olvidado la contraseña tenemos una opción para recuperarla
 +*/


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(public navCtrl: NavController, private globarAuth: AngularFireAuth,
              public alertCtrl: AlertController, private authUser: AuthUserProvider) {
  }
  // Logea al usuario por medio el servicio de fireAuth
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
        subTitle: 'Contraseña o mail incorrectos',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }
// Función par navegar a la pagina de registro de parkings
  registNewParking(){
    this.navCtrl.push('RegistParkingPage');
  }
// Función para navegar a la pagina de registro de empresas
  registNewEntreprise(){
    this.navCtrl.push('RegistEntreprisePage');
  }
  //Función que llama al servicio de FireAuth para la recuperación de contraseñas
  recuperarPass(){
    this.alertCtrl.create({
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
                subTitle: 'Email incorrecto o usuario no registrado',
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

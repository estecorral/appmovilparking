import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Role} from "../../enum/role.enum";
import {UserEntreprise} from "../../models/userEntreprise";
import { Empresa } from "../../models/empresa";

/**
 * Pargina de registro del perfil de la empresa
 *
 *  Formulario para completar el resto de información de la empresa
 */

@IonicPage()
@Component({
  selector: 'page-regist-entreprise2',
  templateUrl: 'regist-entreprise2.html',
})
export class RegistEntreprise2Page {
  userEntreprise = {}as UserEntreprise;
  entreprise = {} as Empresa;
  clave: string;
  nombre: string;
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authEntreprise: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
  }

  // Guarda en la base de datos la información del perfil de la empresa
  createProfile() {
    this.userEntreprise.role = Role.entreprise;
    this.nombre = this.userEntreprise.nombre;
    this.authEntreprise.authState.take(1).subscribe(auth => {
      this.clave = auth.uid;
      this.email = auth.email;
      this.afDatabase.object(`userEntreprise/${auth.uid}`)
        .set(this.userEntreprise).then(() => this.navCtrl.setRoot('LoginPage'));
      this.createEntreprise();
    });
  }
  createEntreprise(){
    this.entreprise.nombre = this.nombre;
    this.entreprise.key = this.clave;
    this.entreprise.email = this.email;
    this.afDatabase.list('entreprises').push(this.entreprise);
  }
}

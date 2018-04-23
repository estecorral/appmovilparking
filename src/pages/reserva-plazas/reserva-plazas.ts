import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the ReservaPlazasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva-plazas',
  templateUrl: 'reserva-plazas.html',
})
export class ReservaPlazasPage {

  parking: any;
  userEntrepriseData: any;
  empresa: any;
  clave: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth: AngularFireAuth,
             private afDatabase: AngularFireDatabase ) {

    this.parking = this.navParams.get('parking');
    this.userAuth.authState.subscribe(data => {
      this.clave = data.uid;
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
        });
    });
    this.afDatabase.list('entreprises').valueChanges().subscribe( empresasData => {
      for(let i=0; empresasData.length > i; i++){
        if(empresasData[i].key === this.clave){
          this.guardarEmpresa(empresasData[i]);
          console.log(this.empresa);
        }
      }
      console.log(this.empresa);
    });
  }
  guardarEmpresa(empresa: any){
    this.empresa = empresa;
  }
}

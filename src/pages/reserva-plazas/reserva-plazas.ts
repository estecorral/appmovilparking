import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Reserva} from "../../models/reserva";
import {Empresa} from "../../models/empresa";

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
  claveEmpresa: string;
  empresasData=  {} as Empresa;
  reserva= {} as Reserva;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth: AuthUserProvider,
             private afDatabase: AngularFireDatabase ) {

    this.parking = this.navParams.get('parking');
    console.log(this.parking);
    this.userAuth.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.afDatabase.object(`userEntreprise/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userEntrepriseData = userData;
          this.claveEmpresa = data.uid;
          console.log(this.userEntrepriseData);
        });
    });
    this.afDatabase.list('entreprises').valueChanges().subscribe( empresasData => {
      for(let i=0; empresasData.length >= i; i++){
       // this.empresasData = empresasData;
        if(empresasData[i].key === this.claveEmpresa){
          // this.claveEmpresa = this.empresasData[i].key;
          this.empresa = this.empresasData[i];
          console.log(this.empresa);
         // this.guardarEmpresa(this.empresasData[i]);
        }
      }
    });
  }
  /*guardarEmpresa(empresa: any){
    this.empresa = empresa;
  }*/

  reservar(){
      this.reserva.keyEmpresa = this.claveEmpresa;
      this.reserva.keyParking = this.parking.key;
      this.afDatabase.list('reserva').push(this.reserva);
    }
}

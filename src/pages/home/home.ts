import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {LoginPage} from "../login/login";
import {ParkingListPage} from "../parking-list/parking-list";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {MyReservationsPage} from "../my-reservations/my-reservations";
import {MyContractsPage} from "../my-contracts/my-contracts";
import {ListEntreprisesPage} from "../list-entreprises/list-entreprises";
import {EntradasPage} from "../entradas/entradas";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private userAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase, private authUser: AuthUserProvider) {

    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();

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

  // Función para salir de la aplicación:
  logOut(){
    this.authUser.logOut();
    // this.userAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
  // Función que navega a la pagina de búsqueda de camiones
  buscarParking(nombreEmpresa: string){
    this.navCtrl.push(ParkingListPage);
  }
  // Funciín para navegar a la pagina de mis reservas como empresa
  misReservas(nombreEmpresa: string){
    this.navCtrl.push(MyReservationsPage);
  }
  // Función para navegar a la pagina de contratos que tiene una empresa con los parkings
  misContratos(){
    this.navCtrl.push(MyContractsPage);
  }
  // Función que navega al listado de empresas que tienen reservas en un parking
  empresasParking(parking: any){
    this.navCtrl.push(ListEntreprisesPage, {parking});
  }
  entradas(parking: any){
    this.navCtrl.push(EntradasPage, {parking});
  }
}

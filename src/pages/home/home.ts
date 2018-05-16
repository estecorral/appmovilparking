import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {LoginPage} from "../login/login";
import {ParkingListPage} from "../parking-list/parking-list";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {MyReservationsPage} from "../my-reservations/my-reservations";
import {MyContractsPage} from "../my-contracts/my-contracts";
import {ListEntreprisesPage} from "../list-entreprises/list-entreprises";
import {EntradasPage} from "../entradas/entradas";
import {SalidasPage} from "../salidas/salidas";
import {PlazasPage} from "../plazas/plazas";

/**
 * Página home
 * Muestra un home según el tipo de usuario que se conecte (Usuario de parking o usuario de empresa)
 * con su menú de gestión correspondiente.
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
              private toast: ToastController, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {
// Devuelve el usuario que esta autenticado y muestra un mensaje de bienvenida
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();
// Devuelve la información de un usuario de Parking
      this.afDatabase.object(`userParking/${data.uid}`).valueChanges()
        .subscribe( userData => {
          this.userParkingData = userData;
        });
      //Devuelve la información de un usuario empresa
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
  // Función que navega al listado de entradas de vehículos que tiene un parking
  entradas(){
    this.navCtrl.push(EntradasPage);
  }
  // Función que navega al listado de salidas de vehículos que tiene un parking
  salidas(){
    this.navCtrl.push(SalidasPage)
  }
  // Función que navega al listado de plazas de las que dispone el parking
  plazas(){
    this.navCtrl.push(PlazasPage);
  }
}

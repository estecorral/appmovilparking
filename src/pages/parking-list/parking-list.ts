import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {DetalleParkingPage} from "../detalle-parking/detalle-parking";
import {Parking} from "../../models/parking";
/**
 * Pagina que lista los parking en una localidad
 *
 * Permite buscar parkings en una determinada localidad y muestra la lista de los parkings de la localidad que
 * se ha introducido en el buscador
 */

@IonicPage()
@Component({
  selector: 'page-parking-list',
  templateUrl: 'parking-list.html',
})
export class ParkingListPage {
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  localidades;
  plazas = [];
  plazasLibres = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    // Recupera la información de las localidades
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((localidades) => {
        this.localidades = localidades;
      });
    });
  }
  // Recupera los distintos parkings según los caracteres que vamos introduciéndo en el buscador
  getItems($event) {
    let val = $event.target.value;
    this.startAt.next(val);
    this.endAt.next(val + "\uf8ff");
  }
// Query par recuperar las localidades ordenadas según los caracteres escritos en el buscador
  firequery(start, end){
    return this.afDatabase.list('parkings', ref => ref.limitToFirst(4).orderByChild('localidad')
      .startAt(start).endAt(end)).valueChanges();
  }
  // Navega hacia la pagina de detarlle de parking y envia la información del parking para mostrarla
  goDetalle(parking){
    this.navCtrl.push(DetalleParkingPage, {parking});
  }
  buscarPlazasLibres(plazas){
    let j = 0;
    for(let i = 0; i < plazas.length; i++){
      if(plazas[i].estado === 'libre'){
        this.plazasLibres[j] = plazas[i];
        j++;
      }
    }
    return this.plazasLibres.length - 1;
  }
}

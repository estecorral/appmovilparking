import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {DetalleParkingPage} from "../detalle-parking/detalle-parking";
/**
 * Generated class for the ParkingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((localidades) => {
        this.localidades = localidades;
      });
    });
  }
  getItems($event) {
    let val = $event.target.value;
    this.startAt.next(val);
    this.endAt.next(val + "\uf8ff");
  }

  firequery(start, end){
    return this.afDatabase.list('parkings', ref => ref.limitToFirst(4).orderByChild('localidad')
      .startAt(start).endAt(end)).valueChanges();
  }

  goDetalle(parking){
    this.navCtrl.push(DetalleParkingPage, {parking});
  }
}

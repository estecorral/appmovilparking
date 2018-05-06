import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddPlazasPage} from "../add-plazas/add-plazas";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Parking} from "../../models/parking";

/**
 * Generated class for the PlazasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plazas',
  templateUrl: 'plazas.html',
})
export class PlazasPage {

  keyParking: string;
  parking: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
    });
    this.afDatabase.list('parkings').valueChanges().subscribe(data => {
      data.forEach(parking => {
        if (this.keyParking === (parking as Parking).key){
           this.parking = parking;
           console.log(this.parking);
           return;
        }
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlazasPage');
    this.afDatabase.list('parkings').valueChanges().subscribe(data => {
      console.log(data);
    })
  }

  addPlazas(){
    this.navCtrl.push(AddPlazasPage);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Plaza} from "../../models/plaza";

/**
 * Generated class for the AddPlazasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-plazas',
  templateUrl: 'add-plazas.html',
})
export class AddPlazasPage {
  columnas = [];
  numCol: number;
  plaza = {} as Plaza;
  keyParking: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
              private authUser: AuthUserProvider) {

  }

  ionViewDidLoad() {
    this.authUser.verificaUsuario().subscribe(data => {
      if (!data){
        return;
      }
      this.keyParking = data.uid;
      console.log(this.keyParking);
    });
  }

  addColumnas(){
    this.columnas.length = this.numCol;
      console.log(this.columnas);
  }
  addNewPlazas(){
    console.log(this.columnas);
    console.log(this.keyParking);
    for (let i = 0; i < this.columnas.length; i++){
      for(let j = 0; j < this.columnas[i].toNumber(); j++){
        (this.plaza as Plaza).keyParking = this.keyParking;
        (this.plaza as Plaza).columna = i;
        (this.plaza as Plaza).numPlaza = j;
        this.afDatabase.list('plazas').push(this.plaza);
      }
    }
    // this.afDatabase.list('plazas').push();
  }
  customTrackBy(index: number) {
    return index;
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { ToastController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private userAuth: AngularFireAuth,
              private toast: ToastController) {

  }
  ionViewWillLoad() {
    this.userAuth.authState.subscribe(data => {
      this.toast.create({
        message: `Bienvenido, ${data.email}`,
        duration: 3000
      }).present();
    });
  }

}

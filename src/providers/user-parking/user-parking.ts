import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "angularfire2/database";
import {UserParking} from "../../models/userParking";


@Injectable()
export class UserParkingProvider {

  clave: string;
  userParking: any = {};
  userParkingData: UserParking;
  constructor(private afDataBase: AngularFireDatabase) {

  }

  verificaParking(clave: string){
    return new Promise ((resolve, reject) => {
      this.afDataBase.object(`userParking/${clave}`)
        .valueChanges().subscribe( data => {
          console.log(data);
            this.clave = clave;
            this.userParking = data;
           return this.userParking;
      });
      });

    }
}

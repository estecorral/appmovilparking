import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Parking} from "../../models/parking";
import 'rxjs/Rx'
/*
  Generated class for the ParkingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingsProvider {

  parkingsURL: string ="";

  constructor(public http: HttpClient) {

  }
  nuevoParking( parking: Parking){
    let body = JSON.stringify(parking);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(this.parkingsURL, body, {headers} )
      .map( res =>{
        console.log(res);
      return res;
      })
  }
}

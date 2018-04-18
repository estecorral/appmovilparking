import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

/*
  Generated class for the UserEntrepriseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserEntrepriseProvider {
  clave: string;
  userEntreprise: any = {};
  constructor(public http: HttpClient, private afDataBase: AngularFireDatabase) {

  }

  verificaEmpresa(clave: string){

  }
}

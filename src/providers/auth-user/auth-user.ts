import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

/*
  Generated class for the AuthUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthUserProvider {

  constructor(private auth: AngularFireAuth) {

  }

  verificaUsuario(){
    return this.auth.authState;
  }

  logOut(){
    this.auth.auth.signOut();
  }

  async recuperaPass(email: any){
    return await this.auth.auth.sendPasswordResetEmail(email);
  }
}

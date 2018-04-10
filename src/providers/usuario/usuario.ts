import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Servicio creado para la gestión del login de los usuarios, tanto de empresas como de parkings
*/
@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient, private afDB: AngularFireDatabase) {

  }

}

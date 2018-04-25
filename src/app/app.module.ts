import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";

// servicios
import { UserParkingProvider } from '../providers/user-parking/user-parking';
import { UserEntrepriseProvider } from '../providers/user-entreprise/user-entreprise';
import { ParkingsProvider } from '../providers/parkings/parkings';

//pages
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {RegistEntreprisePage} from "../pages/regist-entreprise/regist-entreprise";
import {RegistEntreprise2Page} from "../pages/regist-entreprise2/regist-entreprise2";
import {RegistParkingPage} from "../pages/regist-parking/regist-parking";
import {RegistParking2Page} from "../pages/regist-parking2/regist-parking2";
import {ParkingListPage} from "../pages/parking-list/parking-list";
import {DetalleParkingPage} from "../pages/detalle-parking/detalle-parking";
import {ReservaPlazasPage} from "../pages/reserva-plazas/reserva-plazas";
import { AuthUserProvider } from '../providers/auth-user/auth-user';

@NgModule({
  declarations: [
    MyApp,
    ParkingListPage,
    DetalleParkingPage,
    ReservaPlazasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ParkingListPage,
    DetalleParkingPage,
    ReservaPlazasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserParkingProvider,
    UserEntrepriseProvider,
    ParkingsProvider,
    AuthUserProvider,
  ]
})
export class AppModule {}

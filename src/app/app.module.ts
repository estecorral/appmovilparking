import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";

// servicios
import { UserParkingProvider } from '../providers/user-parking/user-parking';
import { UserEntrepriseProvider } from '../providers/user-entreprise/user-entreprise';
import { ParkingsProvider } from '../providers/parkings/parkings';
import { AuthUserProvider } from '../providers/auth-user/auth-user';
//pages
import {ParkingListPage} from "../pages/parking-list/parking-list";
import {DetalleParkingPage} from "../pages/detalle-parking/detalle-parking";
import {ReservaPlazasPage} from "../pages/reserva-plazas/reserva-plazas";
import {MyReservationsPage} from "../pages/my-reservations/my-reservations";
import {MyContractsPage} from "../pages/my-contracts/my-contracts";
import {ListEntreprisesPage} from "../pages/list-entreprises/list-entreprises";
import {GestionContratoPage} from "../pages/gestion-contrato/gestion-contrato";
import {EntradasPage} from "../pages/entradas/entradas";
import {SalidasPage} from "../pages/salidas/salidas";
import {NuevaEntradaPage} from "../pages/nueva-entrada/nueva-entrada";

@NgModule({
  declarations: [
    MyApp,
    ParkingListPage,
    DetalleParkingPage,
    ReservaPlazasPage,
    MyReservationsPage,
    MyContractsPage,
    ListEntreprisesPage,
    GestionContratoPage,
    EntradasPage,
    SalidasPage,
    NuevaEntradaPage
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
    ReservaPlazasPage,
    MyReservationsPage,
    MyContractsPage,
    ListEntreprisesPage,
    GestionContratoPage,
    EntradasPage,
    SalidasPage,
    NuevaEntradaPage
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

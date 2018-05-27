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
import { FormsModule } from "@angular/forms";
// servicios
import { UserParkingProvider } from '../providers/user-parking/user-parking';
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
import {NuevaSalidaPage} from "../pages/nueva-salida/nueva-salida";
import {PlazasPage} from "../pages/plazas/plazas";
import {MovimientosEmpresaPage} from "../pages/movimientos-empresa/movimientos-empresa";
import {DetalleMovimientoPage} from "../pages/detalle-movimiento/detalle-movimiento";
import {MovimientosEmpresaParkingPage} from "../pages/movimientos-empresa-parking/movimientos-empresa-parking";

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
    NuevaEntradaPage,
    NuevaSalidaPage,
    PlazasPage,
    MovimientosEmpresaPage,
    DetalleMovimientoPage,
    MovimientosEmpresaParkingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
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
    NuevaEntradaPage,
    NuevaSalidaPage,
    PlazasPage,
    MovimientosEmpresaPage,
    DetalleMovimientoPage,
    MovimientosEmpresaParkingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserParkingProvider,
    ParkingsProvider,
    AuthUserProvider,
    FormsModule
  ]
})
export class AppModule {}

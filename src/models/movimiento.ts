export interface Movimiento{
  keyEmpresa: string;
  keyParking: string;
  nombreEmpresaTransporte: string;
  matriculaCamion: string;
  matriculaSemiremolque?:string;
  nombreTransportista: string;
  dniTranportista: string;
  fechaEntrada: Date;
  fechaSalida: Date;
  plaza: string;
}

export interface Movimiento{
  keyEmpresa: string;
  keyParking: string;
  nombreEmpresaTransporte: string;
  matriculaCamion: string;
  matriculaSemiremolque?:string;
  matriculaSemiremolqueSalida?:string;
  nombreTransportista: string;
  dniTranportista: string;
  nombreTransportistaSalida: string;
  dniTranportistaSalida: string;
  fechaEntrada: Date;
  horaEntrada: Date;
  fechaSalida: Date;
  horaSalida: Date;
  plaza: string;
  tipo: string;
}

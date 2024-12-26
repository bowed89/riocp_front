import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
    selector: 'app-nota-rechazo',
    templateUrl: './nota-rechazo.component.html',
    styleUrls: ['./nota-rechazo.component.scss']
})
export class NotaRechazoComponent {
    @Input() idSolicitud: any;
    @Input() tipoNotaRiocp: any;

    // recibimos sd y vpd desde certificado riocp componente con internediario en derivar-modal
    @Input() sd: any;
    @Input() vpd: any;
    @Input() seguimientoForm!: FormGroup;

    @Output() botonDerivar = new EventEmitter<any>();

    //certificadoForm!: FormGroup;
    token = localStorage.getItem('token');

    constructor(
        private _notaCertificadoRiocpService: NotaCertificadoRiocpService,
    ) { }


    ngOnInit() {
        setTimeout(() => {
            console.log("idSolicitud =>" + this.idSolicitud);
            console.log("tipoNotaRiocp =>" + this.tipoNotaRiocp);
            console.log("sd =>" + this.sd);
            console.log("vpd =>" + this.vpd);

            // pregunto si tiene una nota_certificado_riocp anterior de otro tecnico


            // inicia preguntando si tienen valores
            if (this.tipoNotaRiocp !== '') {
                this.botonDerivar.emit(true);

            } else {
                this.botonDerivar.emit(false);
            }


            //console.log("this._notaCertificadoRiocpService.cargarUnaVezNota ==>" + this._notaCertificadoRiocpService.cargarUnaVezNota);

            // Escuchar cambios en el formulario, estos cambios son para cambiar el flag del btn
            // de la pestaña 'Derivar', si tienen contenido esos valores se habilita esa pestaña
            this.seguimientoForm.valueChanges.subscribe(({
                fecha, nro_nota, header, referencia, body, remitente, revisado
            }): any => {

                // console.log(fecha, nro_nota, header, referencia, body, remitente, revisado);
                console.log("Fecha => " + fecha);
                console.log("Nro => " + nro_nota);
                console.log("header => " + header);
                console.log("referencia => " + referencia);
                console.log("body => " + body);
                console.log("remitente => " + remitente);
                console.log("revisado => " + revisado);

                if (fecha.length > 0 && nro_nota.length > 0 && header.length > 0 && referencia.length > 0 && body.length > 0
                    && remitente.length > 0 && revisado.length > 0) {

                    this.botonDerivar.emit(true);

                } else {
                    this.botonDerivar.emit(false);
                }
            });

            // evita que vuelva a cargar DESDE LA BD y perder mis datos que cambie en mi textare de la nota
            // cada vez q navego de pestaña en pestaña, solamente cargara cuando cambie
            // el tipoNotaRiocp, por ej OBSERVADO, RECHAZADO, APROBADO
            /*  if (this._notaCertificadoRiocpService.cargarUnaVezNota !== '')
                 return
      */

            // Cargamos el tipo de nota
            switch (this.tipoNotaRiocp) {
                case 'APROBACIÓN':
                    if (this._notaCertificadoRiocpService.cargarUnaVezNota !== '') {
                        return
                    }

                    this.obtenerDatosNotaAprobado();

                    break;
                case 'OBSERVACIONES':
                    if (this._notaCertificadoRiocpService.cargarUnaVezNota !== '') {
                        return
                    }
                    this.obtenerDatosNotaObservacion();

                    break;
                case 'RECHAZO':
                    if (this._notaCertificadoRiocpService.cargarUnaVezNota !== '') {
                        return
                    }

                    this.obtenerDatosNotaRechazo();

                    break;
                default:
                    break;
            }



        })
    }


    obtenerDatosNotaAprobado() {
        console.log(this.idSolicitud);

        if (!this._notaCertificadoRiocpService.tieneNotaCargadaAnterior) {
            this._notaCertificadoRiocpService.GetDatosNotaAprobadoRiocp(this.token!, this.idSolicitud).subscribe({
                next: (value) => {
                    const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                    this.seguimientoForm.patchValue({
                        body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                    });

                    this._notaCertificadoRiocpService.cargarUnaVezNota = body;

                }, error(err) {
                    console.error(err);
                }
            });

        } else {
            this._notaCertificadoRiocpService.GetNotaObservadorVerificadaTecnico(this.token!, this.idSolicitud)
                .subscribe({
                    next: ({ data }) => {
                        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = data;
                        this.seguimientoForm.patchValue({
                            body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                        });

                        this._notaCertificadoRiocpService.cargarUnaVezNota = body;

                    }, error: (error) => {
                        console.error(error);
                    }

                })
        }




    }

    obtenerDatosNotaObservacion() {
        console.log(this.idSolicitud);
        if (!this._notaCertificadoRiocpService.tieneNotaCargadaAnterior) {
            this._notaCertificadoRiocpService.GetDatosNotaObservacionRiocp(this.token!, this.idSolicitud).subscribe({
                next: (value) => {
                    const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                    this.seguimientoForm.patchValue({
                        body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                    });

                    this._notaCertificadoRiocpService.cargarUnaVezNota = body;

                }, error(err) {
                    console.error(err);
                }
            })

        } else {
            this._notaCertificadoRiocpService.GetNotaObservadorVerificadaTecnico(this.token!, this.idSolicitud)
                .subscribe({
                    next: ({ data }) => {
                        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = data;
                        this.seguimientoForm.patchValue({
                            body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                        });

                        this._notaCertificadoRiocpService.cargarUnaVezNota = body;

                    }, error: (error) => {
                        console.error(error);
                    }

                })
        }
    }

    obtenerDatosNotaRechazo() {
        console.log(this.idSolicitud);

        if (!this._notaCertificadoRiocpService.tieneNotaCargadaAnterior) {

            this._notaCertificadoRiocpService.GetDatosNotaRechazoRiocp(this.token!, this.idSolicitud, this.sd, this.vpd).subscribe({
                next: (value) => {
                    const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                    this.seguimientoForm.patchValue({
                        body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                    });

                }, error(err) {
                    console.error(err);
                }
            })

        } else {

            this._notaCertificadoRiocpService.GetNotaObservadorVerificadaTecnico(this.token!, this.idSolicitud)
                .subscribe({
                    next: ({ data }) => {
                        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = data;
                        this.seguimientoForm.patchValue({
                            body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                        });

                        this._notaCertificadoRiocpService.cargarUnaVezNota = body;

                    }, error: (error) => {
                        console.error(error);
                    }

                })
        }
    }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        private _notaCertificadoRiocpService: NotaCertificadoRiocpService
    ) { }

    ngOnInit() {
        console.log("idSolicitud =>" + this.idSolicitud);
        console.log("tipoNotaRiocp =>" + this.tipoNotaRiocp);
        console.log("sd =>" + this.sd);
        console.log("vpd =>" + this.vpd);


        // Escuchar cambios en el formulario, estos cambios son para cambiar el flag del btn
        // de la pestaña 'Derivar', si tienen contenido esos valores se habilita esa pestaña
        this.seguimientoForm.valueChanges.subscribe(({
            fecha, nro_nota, header, referencia, body, remitente, revisado
        }): any => {

            console.log(fecha, nro_nota, header, referencia, body, remitente, revisado);

            if (fecha.length > 0 && nro_nota.length > 0 && header.length > 0 && referencia.length > 0 && body.length > 0
                && remitente.length > 0 && revisado.length > 0) {

                this.botonDerivar.emit(true);

            } else {
                this.botonDerivar.emit(false);
            }
        });

        // Cargamos el tipo de nota
        switch (this.tipoNotaRiocp) {
            case 'APROBACIÓN':
                this.obtenerDatosNotaAprobado();

                break;
            case 'OBSERVACIONES':
                this.obtenerDatosNotaObservacion();

                break;
            case 'RECHAZO':
                this.obtenerDatosNotaRechazo();

                break;
            default:
                // Lógica para casos no contemplados
                break;
        }

    }


    obtenerDatosNotaAprobado() {
        console.log(this.idSolicitud);

        this._notaCertificadoRiocpService.GetDatosNotaAprobadoRiocp(this.token!, this.idSolicitud).subscribe({
            next: (value) => {
                const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                this.seguimientoForm.patchValue({
                    body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                });

            }, error(err) {
                console.error(err);
            },
        })
    }

    obtenerDatosNotaObservacion() {
        console.log(this.idSolicitud);

        this._notaCertificadoRiocpService.GetDatosNotaObservacionRiocp(this.token!, this.idSolicitud).subscribe({
            next: (value) => {
                const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                this.seguimientoForm.patchValue({
                    body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                });

            }, error(err) {
                console.error(err);
            },
        })
    }

    obtenerDatosNotaRechazo() {
        console.log(this.idSolicitud);

        this._notaCertificadoRiocpService.GetDatosNotaRechazoRiocp(this.token!, this.idSolicitud, this.sd, this.vpd).subscribe({
            next: (value) => {
                const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
                this.seguimientoForm.patchValue({
                    body, footer, header, referencia, fecha, nro_nota, remitente, revisado
                });

            }, error(err) {
                console.error(err);
            },
        })
    }

}

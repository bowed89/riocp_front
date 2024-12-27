import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificadoRiocpService } from 'src/app/shared/services/certificado-riocp.service';
import { FormGroup } from '@angular/forms';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
    selector: 'app-certificado-riocp',
    templateUrl: './certificado-riocp.component.html',
    styleUrls: ['./certificado-riocp.component.scss']
})
export class CertificadoRiocpComponent {
    token = localStorage.getItem('token');
    @Input() seguimientoForm!: FormGroup;
    @Input() idSolicitud: any;
    @Output() tipoNotaRiocp: EventEmitter<string> = new EventEmitter<string>();

    @Output() botonNota = new EventEmitter<any>();

    // enviamos sd y vpd hasta componente nota de rechazo
    @Output() sd = new EventEmitter<any>();
    @Output() vpd = new EventEmitter<any>();

    //certificadoForm!: FormGroup;
    radio: any;
    visible: boolean = false;

    constructor(
        public _certificadoRiocpService: CertificadoRiocpService,
        private _notaCertificadoRiocpService: NotaCertificadoRiocpService,

    ) { }

    ngOnInit() {
        if (this._notaCertificadoRiocpService.cargarUnaVezNota !== '')
            return;

        this.datosCertificado();
        console.log("idSolicitud certificado riocpS=>" + this.idSolicitud);

        // Escuchar cambios en el formulario, estos cambios son para cambiar el flag del btn
        // de la pestaña 'Nota', si no tiene contenido esos 3 valores esta deshabilitado esa pestaña
        this.seguimientoForm.valueChanges.subscribe(({ objeto_operacion_credito, valor_presente_deuda_total, servicio_deuda }): any => {
            if (objeto_operacion_credito?.length > 0 && valor_presente_deuda_total >= 0 && servicio_deuda >= 0) {
                this.botonNota.emit(true);
            } else {
                this.botonNota.emit(false);
            }
        });
    }

    datosCertificado() {
        this._certificadoRiocpService.GetDatosCertificado(this.token!, this.idSolicitud).subscribe({
            next: ({ data }) => {

                // verifico que los indicadores estan dentro del rango
                // para emitir por output
                if (data[0].servicio_deuda <= 20.00 && data[0].valor_presente_deuda <= 200.00) {
                    this.tipoNotaRiocp.emit('APROBACIÓN');
                    this._notaCertificadoRiocpService.cargarUnaVezNota = '';

                } else {
                    this.tipoNotaRiocp.emit('RECHAZO');
                    this._notaCertificadoRiocpService.cargarUnaVezNota = '';

                }

                console.log("riocp=>" + JSON.stringify(data[0]));
                this.seguimientoForm.patchValue({
                    identificador_id: data[0].identificador_id,
                    nro_solicitud: data[0].nro_solicitud,
                    codigo: data[0].codigo,
                    entidad: data[0].entidad,
                    objeto_operacion_credito: data[0].objeto_operacion_credito,
                    acreedor: data[0].acreedor,
                    monto_total: data[0].monto_total,
                    moneda: data[0].moneda,
                    interes_anual: data[0].interes_anual,
                    comision: `${data[0].comision_concepto}\n${data[0].comision_tasa}`,
                    plazo: data[0].plazo,
                    periodo_gracia: data[0].periodo_gracia,
                    servicio_deuda: `${data[0].servicio_deuda}`,
                    valor_presente_deuda_total: `${data[0].valor_presente_deuda}`,
                });

            }, error(err) {
                console.error(err);
            },
        })

    }

    detectarRangoSD(e: any) {
        console.log("detectarRangoSD");

        let valorNumerico = parseFloat(e); // Convierte a número
        this.sd.emit(valorNumerico);

        if (isNaN(valorNumerico)) {
            this.seguimientoForm.patchValue({
                servicio_deuda: 0
            });

            this.tipoNotaRiocp.emit('RECHAZO');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

            console.log(valorNumerico);
        }

        if (valorNumerico <= 20) {
            console.log(valorNumerico);
            this.tipoNotaRiocp.emit('APROBACIÓN');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        } else {
            this.tipoNotaRiocp.emit('RECHAZO');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        }
    }

    detectarRangoVPD(e: any) {
        console.log("detectarRangoVPD");

        let valorNumerico = parseFloat(e);
        this.vpd.emit(valorNumerico);

        if (isNaN(valorNumerico)) {
            this.seguimientoForm.patchValue({
                valor_presente_deuda_total: 0
            });
            this.tipoNotaRiocp.emit('RECHAZO');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        }

        if (valorNumerico <= 200) {
            console.log(valorNumerico);
            this.tipoNotaRiocp.emit('APROBACIÓN');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        } else {
            this.tipoNotaRiocp.emit('RECHAZO');
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        }

    }

}

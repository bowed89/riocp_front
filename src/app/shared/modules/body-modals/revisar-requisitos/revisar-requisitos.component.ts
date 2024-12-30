import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservacionRevisorService } from 'src/app/modules/revisor/tramites/services/observacion-revisor.service';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
    selector: 'app-revisar-requisitos',
    templateUrl: './revisar-requisitos.component.html',
    styleUrls: ['./revisar-requisitos.component.scss']
})
export class RevisarRequisitosComponent {
    token = localStorage.getItem('token');
    // valor input que recibe desde el padre al hijo
    @Input() selectedSolicitud!: number
    @Input() observationsFormArray!: FormArray
    @Input() seguimientoForm!: FormGroup;
    @Input() rolRevisarObservacion!: string

    // valor output que envia desde el hijo hasta el padre
    @Output() envioModal = new EventEmitter();
    @Output() botonRiocp: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() tipoNotaRiocp: EventEmitter<string> = new EventEmitter<string>();


    constructor(
        private _notaCertificadoRiocpService: NotaCertificadoRiocpService,
        public _observacionRevisorService: ObservacionRevisorService,
        private fb: FormBuilder,
    ) { }



    ngOnInit() {
        setTimeout(() => {

            if (this.selectedSolicitud !== undefined) {

                console.log("this.rolRevisarObservacion " + this.rolRevisarObservacion);

                if (this.rolRevisarObservacion == 'REVISOR') {
                    // ver observacion para el revisor
                    this.ObtenerObservacionesDeTecnico();
                }
                else if (this.rolRevisarObservacion == 'JEFE UNIDAD') {
                    this.ObtenerObservacionesDeRevisor();
                }

            }
        });

    }

    abrirModales(i: any) {
        this.envioModal.emit(i);
    }

    activarBotonRiocp(i?: any) {
        // cambie las observaciones y por ende se borra la nota cargada anteriormente
        this._notaCertificadoRiocpService.tieneNotaCargadaAnterior = false;

        const nuevoEstado = !this.observationsFormArray.value.some((item: any) => Number(item.cumple) === 0);
        this.botonRiocp.emit(nuevoEstado); //  activar/desactivar btn de pestaña certificado RIOCP

        if (!nuevoEstado) {
            this.observationsFormArray.at(i).get('observacion')?.setValue(null); // Borra el valor

            // ponemos los valores de seguimientoForm como not required
            this.seguimientoForm.get('identificador_id')?.setValidators(null);
            this.seguimientoForm.get('nro_solicitud')?.setValidators(null);
            this.seguimientoForm.get('codigo')?.setValidators(null);
            this.seguimientoForm.get('entidad')?.setValidators(null);
            this.seguimientoForm.get('objeto_operacion_credito')?.setValidators(null);
            this.seguimientoForm.get('acreedor')?.setValidators(null);
            this.seguimientoForm.get('monto_total')?.setValidators(null);
            this.seguimientoForm.get('moneda')?.setValidators(null);
            this.seguimientoForm.get('interes_anual')?.setValidators(null);
            this.seguimientoForm.get('comision')?.setValidators(null);
            this.seguimientoForm.get('plazo')?.setValidators(null);
            this.seguimientoForm.get('periodo_gracia')?.setValidators(null);
            this.seguimientoForm.get('servicio_deuda')?.setValidators(null);
            this.seguimientoForm.get('valor_presente_deuda_total')?.setValidators(null);

            console.log('hay observaciones');
            this.tipoNotaRiocp.emit("OBSERVACIONES");
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        } else {
            this.observationsFormArray.at(i).get('observacion')?.setValue('SIN OBSERVACIONES'); // Borra el valor

            // Cambiar validadores para los campos DE CERTIFICADO RIOCP
            this.seguimientoForm.get('identificador_id')?.setValidators([Validators.required]);
            this.seguimientoForm.get('nro_solicitud')?.setValidators([Validators.required]);
            this.seguimientoForm.get('codigo')?.setValidators([Validators.required]);
            this.seguimientoForm.get('entidad')?.setValidators([Validators.required]);
            this.seguimientoForm.get('objeto_operacion_credito')?.setValidators([Validators.required]);
            this.seguimientoForm.get('acreedor')?.setValidators([Validators.required]);
            this.seguimientoForm.get('monto_total')?.setValidators([Validators.required]);
            this.seguimientoForm.get('moneda')?.setValidators([Validators.required]);
            this.seguimientoForm.get('interes_anual')?.setValidators([Validators.required]);
            this.seguimientoForm.get('comision')?.setValidators([Validators.required]);
            this.seguimientoForm.get('plazo')?.setValidators([Validators.required]);
            this.seguimientoForm.get('periodo_gracia')?.setValidators([Validators.required]);
            this.seguimientoForm.get('servicio_deuda')?.setValidators([Validators.required]);
            this.seguimientoForm.get('valor_presente_deuda_total')?.setValidators([Validators.required]);

            console.log('no hay observaciones');
            this.tipoNotaRiocp.emit("");
            this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        }


    }


    ObtenerObservacionesDeTecnico() {

        console.log("ObtenerObservacionesDeTecnico");


        if (this.observationsFormArray.length === 0) {
            this._observacionRevisorService.GetTecnicoObservacion(this.token!, this.selectedSolicitud)
                .subscribe({
                    next: ({ data }) => {
                        data.forEach((res: any) => {

                            console.log("data ===>" + JSON.stringify(res));

                            this.observationsFormArray.push(this.fb.group({
                                enumeracion: [`${res.enumeracion}.`],
                                cumple: [res.cumple, Validators.required],
                                descripcion: [res.tipo_observacion, Validators.required],
                                tipo_observacion_id: [res.tipo_observacion_id, Validators.required],
                                observacion: [res.observacion, Validators.required]
                            }));
                        });

                        const nuevoEstado = !this.observationsFormArray.value.some((item: any) => Number(item.cumple) === 0);

                        console.log("nuevoEstado ===>" + nuevoEstado);

                        this.botonRiocp.emit(nuevoEstado); //   activar/desactivar botón
                        if (!nuevoEstado) {
                            this.tipoNotaRiocp.emit("OBSERVACIONES");
                        } else {
                            this.tipoNotaRiocp.emit("");
                        }

                    }, error(err) {
                        console.error(err);
                    }
                });
        }
    }

    ObtenerObservacionesDeRevisor() {
        console.log("ObtenerObservacionesDeRevisor");

        if (this.observationsFormArray.length === 0) {
            this._observacionRevisorService.GetRevisorJefeUnidadObservacion(this.token!, this.selectedSolicitud)
                .subscribe({
                    next: ({ data }) => {


                        data.forEach((res: any) => {
                            console.log("data ===>" + JSON.stringify(res));


                            this.observationsFormArray.push(this.fb.group({
                                enumeracion: [`${res.enumeracion}.`],
                                cumple: [res.cumple, Validators.required],
                                descripcion: [res.tipo_observacion, Validators.required],
                                tipo_observacion_id: [res.tipo_observacion_id, Validators.required],
                                observacion: [res.observacion, Validators.required]
                            }));
                        });

                        const nuevoEstado = !this.observationsFormArray.value.some((item: any) => Number(item.cumple) === 0);

                        console.log("nuevoEstado ===>" + nuevoEstado);

                        this.botonRiocp.emit(nuevoEstado); //   activar/desactivar botón
                        if (!nuevoEstado) {
                            this.tipoNotaRiocp.emit("OBSERVACIONES");
                        } else {
                            this.tipoNotaRiocp.emit("");
                        }

                    }, error(err) {
                        console.error(err);
                    }
                })
        }
    }
}

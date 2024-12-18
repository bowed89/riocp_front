import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-revisar-requisitos',
    templateUrl: './revisar-requisitos.component.html',
    styleUrls: ['./revisar-requisitos.component.scss']
})
export class RevisarRequisitosComponent {
    // valor input que recibe desde el padre al hijo
    @Input() observationsFormArray!: FormArray
    @Input() seguimientoForm!: FormGroup;

    // valor output que envia desde el hijo hasta el padre
    @Output() envioModal = new EventEmitter();
    @Output() botonRiocp: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() tipoNotaRiocp: EventEmitter<string> = new EventEmitter<string>();


    constructor(
        private cdRef: ChangeDetectorRef,

    ) { }

    ngOnInit() {
    }


    abrirModales(i: any) {
        this.envioModal.emit(i);
    }

    activarBotonRiocp(i?: any) {
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

        }

    }
}

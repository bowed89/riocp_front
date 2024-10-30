import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ObservacionRevisorService } from 'src/app/modules/revisor/tramites/services/observacion-revisor.service';

@Component({
  selector: 'app-revisar-tecnico',
  templateUrl: './revisar-tecnico.component.html',
  styleUrls: ['./revisar-tecnico.component.scss']
})
export class RevisarTecnicoComponent {
  // valor input que recibe desde el padre al hijo
  @Input() observationsFormArray!: FormArray
  @Input() selectedSolicitud!: number

  // valor output que envia desde el hijo hasta el padre
  @Output() envioModal = new EventEmitter();

  token = localStorage.getItem('token');


  constructor(
    private fb: FormBuilder,
    public _observacionRevisorService: ObservacionRevisorService,
  ) { }

  ngOnChanges(): void {
    if (this.selectedSolicitud !== undefined) {
      this.obtenerObservacionTecnico();
    }
  }


  abrirModales(i: any) {
    this.envioModal.emit(i);
  }


  obtenerObservacionTecnico() {
    this._observacionRevisorService.GetTecnicoObservacion(this.token!, this.selectedSolicitud)
      .subscribe({
        next: ({ data }) => {

          data.forEach((res: any) => {
            this.observationsFormArray.push(this.fb.group({
              enumeracion: [`${res.enumeracion}.`],
              cumple: [res.cumple, Validators.required],
              descripcion: [res.tipo_observacion, Validators.required],
              observacion: [res.observacion, Validators.required]
            }));
          });

          this.observationsFormArray.disable();


        }, error(err) {
          console.error(err);

        },

      })
  }

}

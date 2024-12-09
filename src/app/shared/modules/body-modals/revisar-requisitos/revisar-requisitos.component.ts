import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

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
  abrirModales(i: any) {
    this.envioModal.emit(i);
  }

  activarBotonRiocp() {
    const nuevoEstado = !this.observationsFormArray.value.some((item: any) => Number(item.cumple) === 0);
    this.botonRiocp.emit(nuevoEstado); //  activar/desactivar btn de pestaña certificado RIOCP

    if (!nuevoEstado) {
      console.log('hay observaciones');
      this.tipoNotaRiocp.emit("OBSERVACIONES");

    } else {
      console.log('no hay observaciones');

      this.tipoNotaRiocp.emit("");

    }

  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-revisar-requisitos',
  templateUrl: './revisar-requisitos.component.html',
  styleUrls: ['./revisar-requisitos.component.scss']
})
export class RevisarRequisitosComponent {
  // valor input que recibe desde el padre al hijo
  @Input() observationsFormArray!: FormArray

  // valor output que envia desde el hijo hasta el padre
  @Output() envioModal = new EventEmitter();
  @Output() botonRiocp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() tipoNotaRiocp: EventEmitter<string> = new EventEmitter<string>();

  abrirModales(i: any) {
    this.envioModal.emit(i);
  }

  activarBotonRiocp() {
    const nuevoEstado = !this.observationsFormArray.value.some((item: any) => Number(item.cumple) === 0);
    this.botonRiocp.emit(nuevoEstado);

    if(!nuevoEstado) {
      this.tipoNotaRiocp.emit("OBSERVACIONES");
    } else {
      this.tipoNotaRiocp.emit("");
    }

  }
}

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

  abrirModales(i: any) {
    this.envioModal.emit(i); 
  }
}

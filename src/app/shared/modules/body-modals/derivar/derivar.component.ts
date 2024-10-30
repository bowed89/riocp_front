import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-derivar',
  templateUrl: './derivar.component.html',
  styleUrls: ['./derivar.component.scss']
})
export class DerivarComponent {
  // valor input que recibe desde el padre al hijo
  @Input() tipoRol!: string;
  @Input() listadoRol: any[] = [];
  @Input() seguimientoForm!: FormGroup;

  @Output() valorBooleano: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeModal(flag: boolean) {
    this.valorBooleano.emit(flag); // Emitimos el valor booleano al padre
  }


}





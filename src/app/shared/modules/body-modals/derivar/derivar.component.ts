import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  hoja_ruta = false;

  @Output() valorBooleano: EventEmitter<boolean> = new EventEmitter<boolean>();


  ngOnChanges(): void {
    console.log("sasaasasasasas", this.tipoRol);

    if (this.tipoRol === 'Técnico') {
      this.hoja_ruta = true;
    } else {
      this.hoja_ruta = false;
    }

  }

  ngOnInit(): void {
    // Cuando el formulario cambia, emite los valores
  
  }


  closeModal(flag: boolean) {
    this.valorBooleano.emit(flag); // Emitimos el valor booleano al padre
  }

 


}





import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TipoErroresRevisionService } from 'src/app/shared/services/tipo-errores-revision.service';

@Component({
  selector: 'app-derivar',
  templateUrl: './derivar.component.html',
  styleUrls: ['./derivar.component.scss']
})
export class DerivarComponent {
  token = localStorage.getItem('token');
  tipoErrores: any[] = [];

  // valor input que recibe desde el padre al hijo
  @Input() tipoRol!: string;

  @Input() listadoRol: any[] = [];
  @Input() seguimientoForm!: FormGroup;

  hoja_ruta = false;

  // errores de revisión que cometio el técnico
  errorRevision: boolean = false;

  @Output() valorBooleano: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public _tipoErroresRevisionService: TipoErroresRevisionService
  ) { }

  ngOnChanges(): void {
    if (this.tipoRol === 'Revisor(a)') {
      this.hoja_ruta = true;
    } else {
      this.hoja_ruta = false;
    }

    if (this.tipoRol == 'Jefe Unidad') {
      this.tipoErroresRevision();
      this.errorRevision = true;

    } else {
      this.errorRevision = false;
    }
  }

  revisarErrores(e: any) {
    if (e.value === '1') {
      this.seguimientoForm.patchValue({ tieneErrores: true });
    } else {
      this.seguimientoForm.patchValue({ tieneErrores: false });
    }
  }

  closeModal(flag: boolean) {
    this.valorBooleano.emit(flag); // Emitimos el valor booleano al padre
  }

  tipoErroresRevision() {
    this._tipoErroresRevisionService.TipoErrores(this.token!).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.tipoErrores = data.map(({ tipo_errores, id }: any) => ({
          tipo: tipo_errores, id
        }));

      }, error(err) {
        console.error(err);
      },
    })
  }




}





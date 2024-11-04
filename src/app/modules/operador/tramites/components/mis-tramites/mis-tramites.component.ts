import { Component } from '@angular/core';
import { SeguimientoOperadorService } from '../../services/seguimiento-operador.service';

@Component({
  selector: 'mis-tramites-component',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesComponent {
  title = 'Trámites Técnico';
  token = localStorage.getItem('token');
  seguimientos: any[] = []; // Nueva variable para los seguimientos
  newVisible: boolean = false;

  idRol: number = 3;

  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';

  selectedSolicitud: any
  selectedSeguimiento: any

  constructor(
    public _seguimientoOperadorService: SeguimientoOperadorService
  ) { }


  addDerivar(seguimiento: any) {
    this.selectedSolicitud = seguimiento.solicitud_id;
    this.selectedSeguimiento = seguimiento.id_seguimiento;
    this.newVisible = true;
  }

  getFilterSeguimientos(array?: string[]) {
    console.log(array);

    if (array !== undefined) {
      this.seguimientos = array
    }
  }

  getSeguimientos() {
    this._seguimientoOperadorService.GetSeguimientoOperador(this.token!).subscribe({
      next: ({ data }) => {
        this.seguimientos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  seguimientoChanged() {
    this.getSeguimientos();
  }

  derivar(seguimiento: any) {
    console.log('Derivando seguimiento:', seguimiento);
  }



}

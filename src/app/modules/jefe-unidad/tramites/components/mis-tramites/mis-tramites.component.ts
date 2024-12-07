import { Component } from '@angular/core';
import { SeguimientoAdminService } from '../../services/seguimiento-admin.service';

@Component({
  selector: 'mis-tramites-component',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesComponent {
  title = 'Trámites Jefe de Unidad'
  token = localStorage.getItem('token');
  seguimientos: any[] = [];
  newVisible: boolean = false;

  idRol: number = 2;

  searchText: string = '';

  selectedSolicitud: any
  selectedSeguimiento: any
  selectedIdRolOrigen: any;

  constructor(
    public _seguimientoAdminService: SeguimientoAdminService
  ) { }

  addDerivar(seguimiento: any) {
    console.log("seguimiento ===>", seguimiento);
    this.selectedSolicitud = seguimiento.solicitud_id;
    this.selectedSeguimiento = seguimiento.id_seguimiento;
    this.selectedIdRolOrigen = seguimiento.id_rol_origen;
    this.newVisible = true;
  }

  getFilterSeguimientos(array?: string[]) {    
    if (array !== undefined) {
      this.seguimientos = array
    }
  }

  getSeguimientos() {
    this._seguimientoAdminService.GetSeguimientosAdministrador(this.token!).subscribe({
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

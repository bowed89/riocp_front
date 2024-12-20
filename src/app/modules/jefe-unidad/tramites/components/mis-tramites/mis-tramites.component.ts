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
  newVisibleRevisor: boolean = false;
  
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
    const { solicitud_id, id_seguimiento, id_rol_origen } = seguimiento;



    // Identificar el rol de origen que estamos abriendo la solicitud
    // Si el rol de origen es 1 esta abriendo una solicitud de una Entidad Solicitante
    // Si el rol de origen es 4 esta abriendo una solicitud del Revisor

    if (id_rol_origen === 1) {
      this.selectedSolicitud = solicitud_id;
      this.selectedSeguimiento = id_seguimiento;
      this.selectedIdRolOrigen = id_rol_origen;
      this.newVisible = true;

    } else if (id_rol_origen === 4) {
      this.newVisibleRevisor = true;
    }
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

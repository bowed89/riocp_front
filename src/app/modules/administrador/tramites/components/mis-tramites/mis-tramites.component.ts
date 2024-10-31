import { Component, ViewChild } from '@angular/core';
import { SeguimientosService } from 'src/app/shared/services/seguimientos.service';
import { SeguimientoAdminService } from '../../services/seguimiento-admin.service';

@Component({
  selector: 'mis-tramites-component',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesComponent {
  token = localStorage.getItem('token');
  seguimientos: any[] = []; // Nueva variable para los seguimientos
  newVisible: boolean = false;
  id: number = 0;
  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';

  selectedSolicitud: any
  selectedSeguimiento: any

  constructor(
    public _seguimientoAdminService: SeguimientoAdminService
  ) { }

  ngOnInit() {
    this.getSeguimientos()
  }

  addDerivar(seguimiento: any) {
    console.log("seguimiento ===>", seguimiento);

    this.selectedSolicitud = seguimiento.solicitud_id;
    this.selectedSeguimiento = seguimiento.id_seguimiento;
    this.newVisible = true;
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

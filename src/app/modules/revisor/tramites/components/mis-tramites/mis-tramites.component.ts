import { Component } from '@angular/core';
import { SeguimientoRevisorService } from '../../services/seguimiento-revisor.service';

@Component({
  selector: 'mis-tramites-component',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesComponent {
  title = 'Trámites Revisor';
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
    public _seguimientoRevisorService: SeguimientoRevisorService
  ) { }

  ngOnInit() {
    this.getSeguimientos()
  }

  addDerivar(seguimiento: any) {
    this.selectedSolicitud = seguimiento.solicitud_id;
    this.selectedSeguimiento = seguimiento.id_seguimiento;
    this.newVisible = true;
  }

  getSeguimientos() {
    this._seguimientoRevisorService.GetSeguimientoRevisor(this.token!).subscribe({
      next: ({ data }) => {
        console.log(data);

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

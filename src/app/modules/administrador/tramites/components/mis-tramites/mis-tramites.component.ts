import { Component, ViewChild } from '@angular/core';
import { SeguimientosService } from 'src/app/shared/services/seguimientos.service';

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

  selectedSeguimiento: any

  constructor(
    public _seguimientosService: SeguimientosService,
  ) { }

  ngOnInit() {
    this.getSeguimientos()
  }

  addDerivar(seguimiento: any) {
    this.selectedSeguimiento = seguimiento.solicitud_id; 
    this.newVisible = true;
  }

  getSeguimientos() {
    this._seguimientosService.GetSeguimientos(this.token!).subscribe({
      next: ({ data }) => {
        this.seguimientos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  derivar(seguimiento: any) {
    console.log('Derivando seguimiento:', seguimiento);
  }

}

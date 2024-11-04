import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeguimientoAdminService } from 'src/app/modules/administrador/tramites/services/seguimiento-admin.service';
import { SeguimientoOperadorService } from 'src/app/modules/operador/tramites/services/seguimiento-operador.service';
import { SeguimientoRevisorService } from 'src/app/modules/revisor/tramites/services/seguimiento-revisor.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  token = localStorage.getItem('token');
  selectedFilter: Number = 0;
  seguimientos: any[] = [];
  searchText: string = '';

  @Input() idRol: any;
  @Output() arrayEmitido = new EventEmitter<string[]>();

  placeholder = 'Busqueda por';
  filter: any[] = [
    { label: 'Mostrar Todo', value: 0 },
    { label: 'Nro. Solicitud', value: 1 },
    { label: 'Nro. Hoja de Ruta', value: 2 },
  ];

  constructor(
    public _seguimientoAdminService: SeguimientoAdminService,
    public _seguimientoOperadorService: SeguimientoOperadorService,
    public _seguimientoRevisorService: SeguimientoRevisorService
  ) { }


  ngOnInit() {
    this.getSeguimientos();
  }

  getSeguimientos() {
    if (this.idRol === 4) {
      console.log("revisor");
      this._seguimientoRevisorService.GetSeguimientoRevisor(this.token!).subscribe({
        next: ({ data }) => {
          this.seguimientos = data;
          this.arrayEmitido.emit(this.seguimientos);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    if (this.idRol === 3 || this.idRol === 5) {
      console.log("operador o dgaft");
      this._seguimientoOperadorService.GetSeguimientoOperador(this.token!).subscribe({
        next: ({ data }) => {
          this.seguimientos = data;
          this.arrayEmitido.emit(this.seguimientos);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    if (this.idRol === 2) {
      console.log("jefe unidad");
      this._seguimientoAdminService.GetSeguimientosAdministrador(this.token!).subscribe({
        next: ({ data }) => {
          this.seguimientos = data;
          this.arrayEmitido.emit(this.seguimientos);

        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  showAllDropDown() {
    console.log(this.selectedFilter);
    if (this.selectedFilter === 0) {
      this.getSeguimientos();
      this.searchText = '';
    }
  }

  applyFilter() {
    console.log(this.selectedFilter);
    console.log(this.searchText);
    console.log(this.seguimientos);

    if (this.selectedFilter === 1) {
      this.seguimientos = this.seguimientos.filter(seg =>
        (seg.nro_solicitud).toLowerCase().replace(/\s+/g, '') === (this.searchText).toLowerCase().replace(/\s+/g, ''));

      this.arrayEmitido.emit(this.seguimientos);

    } else if (this.selectedFilter === 2) {
      this.seguimientos = this.seguimientos.filter(seg =>
        (seg.nro_hoja_ruta).toLowerCase().replace(/\s+/g, '') === (this.searchText).toLowerCase().replace(/\s+/g, ''));

      this.arrayEmitido.emit(this.seguimientos);

    } else if (this.selectedFilter === 0) {
      this.getSeguimientos();
      this.searchText = '';
    }
  }

}

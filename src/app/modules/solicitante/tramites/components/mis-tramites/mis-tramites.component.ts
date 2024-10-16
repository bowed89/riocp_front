import { Component } from '@angular/core';
import { SeguimientosService } from 'src/app/shared/services/seguimientos.service';
import { TramitesService } from '../../services/tramites.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mis-tramites-component',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesSolicitanteComponent {
  token = localStorage.getItem('token');
  tramites: any[] = [];
  newVisible: boolean = false;
  id: number = 0;
  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';

  items: MenuItem[];


  selectedSeguimiento: any

  constructor(
    public _seguimientosService: SeguimientosService,
    public _tramitesService: TramitesService,
  ) {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          //this.update();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
         // this.delete();
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
  }

  ngOnInit() {
    this.getTramites()
  }

  addDerivar(seguimiento: any) {
    this.selectedSeguimiento = seguimiento.solicitud_id;
    this.newVisible = true;
  }

  getTramites() {
    this._tramitesService.GetAllTramitesSolicitante(this.token!).subscribe({
      next: ({ data }) => {
        this.tramites = data;
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

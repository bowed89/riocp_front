import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-main-tramite',
  templateUrl: './main-tramite.component.html',
  styleUrls: ['./main-tramite.component.scss']
})
export class MainTramiteComponent {
  routeItems: MenuItem[] = [];
  stepCompleted: boolean = false;
  activeItem: MenuItem;

  constructor(
    private router: Router,
    public _tramitesService: TramitesService
  ) {
    this.routeItems = [
      {
        label: 'REGISTRO',
        routerLink: 'correspondencia',
        disabled: false,
      },
      {
        label: 'Formulario 1',
        routerLink: 'formulario-uno',
        disabled: true
      },
      {
        label: 'Formulario 2',
        routerLink: 'formulario-dos',
        disabled: true
      },
      {
        label: 'Formulario 3',
        routerLink: 'formulario-tres',
        disabled: true
      },
      {
        label: 'Formulario 4',
        routerLink: 'formulario-cuatro',
        disabled: true
      }
    ];

    this.activeItem = this.routeItems[0];
  }

  ngOnInit() {
    console.log("del padre", this._tramitesService.FormRegistroValid);
    
  }

  goNext() {
    const concatRoute = 'solicitante/nuevo-tramite';
    const currentIndex = this.routeItems.indexOf(this.activeItem);

    if (currentIndex < this.routeItems.length - 1) {
      this.activeItem = this.routeItems[currentIndex + 1];
      this.router.navigate([`${concatRoute}/${this.activeItem.routerLink}`]);
    }
  }

  goBack() {
    const concatRoute = 'solicitante/nuevo-tramite';
    const currentIndex = this.routeItems.indexOf(this.activeItem);
    if (currentIndex > 0) {
      this.activeItem = this.routeItems[currentIndex - 1];
      this.router.navigate([`${concatRoute}/${this.activeItem.routerLink}`]);
    }
  }

  canGoBack(): boolean {
    const currentIndex = this.routeItems.indexOf(this.activeItem);
    return currentIndex > 0;
  }

  canGoNext(): boolean {
    const currentIndex = this.routeItems.indexOf(this.activeItem);
    return currentIndex < this.routeItems.length - 1 && this._tramitesService.FormRegistroValid;
  }


}

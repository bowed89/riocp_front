import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TramitesService } from '../../services/tramites.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main-tramite',
  templateUrl: './main-tramite.component.html',
  styleUrls: ['./main-tramite.component.scss']
})
export class MainTramiteComponent {
  routeItems: MenuItem[] = [];
  stepCompleted: boolean = false;
  activeItem: MenuItem;
  items$!: Observable<MenuItem[]>;
  next = false;

  constructor(
    private router: Router,
    public _tramitesService: TramitesService
  ) {
    this.items$ = of(
      [
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
      ]
    )



    this.activeItem = this.routeItems[0];
  }

  ngOnInit() {
    this._tramitesService.formValid$.subscribe((isValid: boolean) => {
      console.log("isValid", isValid);

      if (isValid) {
        this.next = isValid;
        this.items$ = of(this.getMenuItems(false));
      } else {
        this.items$ = of(this.getMenuItems(true));
      }
    });
  }

  private getMenuItems(isLoggedIn: boolean): MenuItem[] {

    console.log("isLoggedIn", isLoggedIn);

    return [
      {
        label: 'REGISTRO',
        routerLink: 'correspondencia',
        disabled: false,
      },
      {
        label: 'Formulario 1',
        routerLink: 'formulario-uno',
        disabled: isLoggedIn
      },
      {
        label: 'Formulario 2',
        routerLink: 'formulario-dos',
        disabled: false
      },
      {
        label: 'Formulario 3',
        routerLink: 'formulario-tres',
        disabled: false
      },
      {
        label: 'Formulario 4',
        routerLink: 'formulario-cuatro',
        disabled: false
      }
    ];
  }
  
  /* 
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
      return currentIndex < this.routeItems.length - 1 && this.next === true;
    } */

}

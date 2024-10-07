import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TramitesService, FormState } from '../../services/tramites.service';

@Component({
  selector: 'app-main-tramite',
  templateUrl: './main-tramite.component.html',
  styleUrls: ['./main-tramite.component.scss']
})
export class MainTramiteComponent {
  routeItems: MenuItem[] = [];
  activeItem: MenuItem;

  values: MenuItem[] = [];

  constructor(
    private router: Router,
    public _tramitesService: TramitesService,

  ) {
    this.values =
      [
     
        {
          label: 'Formulario 1',
          routerLink: 'formulario-uno',
          disabled: false
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
        },
        {
          label: 'REGISTRO',
          routerLink: 'correspondencia',
          disabled: true,
        },
      ]

    this.activeItem = this.routeItems[0];
  }

  ngOnInit() {
    this._tramitesService.formValid$.subscribe(({ isValid, message }: FormState) => {

      console.log('isValid ==>', isValid);
      console.log('message ==>', message);


      switch (message) {
        case 'formulario-1':
          if (isValid) {
            this.values = this.getMenuItems(!isValid, 'formulario-1');
            this.values = [...this.values];
          }
          break;

        case 'formulario-2-pregunta-1':
          this.values = this.getMenuItems(!isValid, 'formulario-2-pregunta-1');
          this.values = [...this.values];
          break;

        case 'formulario-2-pregunta-2':
          this.values = this.getMenuItems(!isValid, 'formulario-2-pregunta-2');
          this.values = [...this.values];
          break;

        case 'formulario-2-pregunta-3':
          this.values = this.getMenuItems(!isValid, 'formulario-2-pregunta-3');
          this.values = [...this.values];
          break;

        case 'formulario-2-pregunta-4':
          this.values = this.getMenuItems(!isValid, 'formulario-2-pregunta-4');
          this.values = [...this.values];
          break;

        default:
          break;
      }
    });

  }

  getMenuItems(activate: boolean, msg: string): MenuItem[] {

    console.log(activate, msg);

    if (msg === 'formulario-1') {
      this.values[1].disabled = activate;
      console.log('entra a formulario1');

    }
    else if (msg === 'formulario-2-pregunta-1') {

      this.values[4].disabled = activate;
      console.log('entra a formulario-2-pregunta-1', this.values);
    }
    else if (msg === 'formulario-2-pregunta-2') {

      this.values[3].disabled = activate;
      console.log('entra a formulario-2-pregunta-2', this.values);
    }
    else if (msg === 'formulario-2-pregunta-3') {
      this.values[3].disabled = activate;
      console.log('entra a formulario-2-pregunta-3', this.values);

    }
    return this.values;
  }

}

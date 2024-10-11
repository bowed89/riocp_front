import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TramitesService, FormState } from '../../services/tramites.service';


export interface Preguntas {
  pregunta_1: boolean,
  pregunta_2: boolean,
  pregunta_3: boolean,
  pregunta_4: boolean,
}

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
    /*   this.values =
        [
          {
            label: 'Anexos',
            routerLink: 'formulario-anexos',
            disabled: false
          },
  
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
        ] */
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
        },
        {
          label: 'Formulario 1 (Anexo)',
          routerLink: 'formulario-1-anexo',
          disabled: false
        },

        {
          label: 'Formulario 2 (Anexo)',
          routerLink: 'formulario-2-anexo',
          disabled: false
        },
        {
          label: 'Sigep Móvil (Anexo)',
          routerLink: 'sigep-anexo',
          disabled: false
        },
        {
          label: 'Registro',
          routerLink: 'correspondencia',
          disabled: false,
        }

      ]

    this.activeItem = this.routeItems[0];
  }

  ngOnInit() {
    this._tramitesService.formValid$.subscribe(({ isValid, message, preguntas }: FormState) => {

      console.log('isValid ==>', isValid);
      console.log('message ==>', message);
      console.log('preguntas ==>', preguntas);


      switch (message) {
        case 'formulario-2':
          if (isValid) {
            this.values = this.getMenuItems(!isValid, 'formulario-2');
            this.values = [...this.values];
          }
          break;

        case 'formulario-3':
          if (isValid) {
            this.values = this.getMenuItems(!isValid, 'formulario-3', preguntas);
            this.values = [...this.values];
          }
          break;

        case 'formulario-4':
          this.values = this.getMenuItems(!isValid, 'formulario-4');
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

  getMenuItems(activate: boolean, msg: string, preguntas?: Preguntas): MenuItem[] {
    console.log(activate, msg);

    if (msg === 'formulario-2') {

      this.values[0].disabled = !activate;
      this.values[1].disabled = activate;
      this.router.navigate(['solicitante/nuevo-tramite/formulario-dos']);

      console.log('entra a formulario2');

    }
    else if (msg === 'formulario-3') {
      this.values[1].disabled = !activate;
      // habilitar pregunta 4
      if (preguntas?.pregunta_1) {
        this.values[0].disabled = !activate;
        this.values[3].disabled = activate;
        this.router.navigate(['solicitante/nuevo-tramite/formulario-cuatro']);
      }
      // habilitar pregunta 3
      if (preguntas?.pregunta_2 || preguntas?.pregunta_3) {
        this.values[0].disabled = !activate;
        this.values[2].disabled = activate;
        this.router.navigate(['solicitante/nuevo-tramite/formulario-tres']);
      }

      // redirigir a formulario 3 o formulario 4 o ninguno

    }
    else if (msg === 'formulario-4') {
      this.values[2].disabled = !activate;
      this.values[3].disabled = activate;
      this.router.navigate(['solicitante/nuevo-tramite/formulario-cuatro']);
      console.log('entra a formulario-4', this.values);
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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { EntidadeService } from '../modules/administrador/administracion/services/entidades.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',

})
export class AppTopBarComponent {

    items: MenuItem[] = [];

    entidad: any[] = [];

    entidades = [
        { label: 'Entidad 1', value: 1 },
        { label: 'Entidad 2', value: 2 },
        { label: 'Entidad 3', value: 3 }
    ];

    solicitudes = [
        { label: 'Solicitud 1', value: 1 },
        { label: 'Solicitud 2', value: 2 },
        { label: 'Solicitud 3', value: 3 }
    ];

    //items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public _authService: AuthService,
        public _entidadeService: EntidadeService,
        private router: Router
    ) { }



    ngOnInit() {
        this.getAllEntidades()
        this.items = [
            { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
        ];
    }


    logout() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this._authService.AuthLogout(token).subscribe(() => {
                localStorage.removeItem('token');
                this.router.navigate(['auth/login']);
            });
        }
    }

    getAllEntidades() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this._entidadeService.GetEntidades(token).subscribe(({ data }) => {
                data.map((value) => {
                    this.entidad.push({
                        label: value.denominacion,
                        value: value.id
                    });
                });

            });

        }
    }

}

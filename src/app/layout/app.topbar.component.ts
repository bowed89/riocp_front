import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { EntidadeService } from '../shared/services/entidades.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',

})
export class AppTopBarComponent {
    selectedEntidad: any;
    nombreUsuario: any;
    items: MenuItem[] = [];
    entidad: any[] = [];
    solicitudes = [
        { label: 'Solicitud 1', value: 1 },
        { label: 'Solicitud 2', value: 2 },
        { label: 'Solicitud 3', value: 3 }
    ];

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
        this.getEntidadesByUserRol()
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

    getEntidadesByUserRol() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this._entidadeService.GetEntidadByUserRol(token).subscribe(({ data }: any) => {
                console.log(data);

                if (data.length > 0 && data[0]?.denominacion) { // si es rol solicitante                    
                    this.entidad.push({
                        label: data[0].denominacion,
                        value: data[0].entidad_id
                    });

                    this.selectedEntidad = this.entidad[0].value;
                    this.nombreUsuario = `${data[0].nombre} ${data[0].apellido}`

                } else if (data.length > 0) {
                    this.nombreUsuario = `${data[0].nombre} ${data[0].apellido}`
                    this._entidadeService.GetEntidades(token).subscribe(({ data }) => {
                        data.map((value) => {
                            this.entidad.push({
                                label: value.denominacion,
                                value: value.id
                            });
                        });
                        this.selectedEntidad = this.entidad[0].value;
                    });
                }
                
                this.items = [
                    { label: `${this.nombreUsuario}`, icon: 'pi pi-users', command: () => this.logout() },
                    { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
                ];

            });
        }


    }

}

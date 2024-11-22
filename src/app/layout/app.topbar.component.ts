import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { EntidadeService } from '../shared/services/entidades.service';
import { WebSocketService } from '../shared/services/websocket.service';
import { NotificacionService } from '../shared/services/notificacion.service';
import { TramitesService } from '../modules/solicitante/tramites/services/tramites.service';
import { SeguimientoAdminService } from '../modules/jefe-unidad/tramites/services/seguimiento-admin.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',

})
export class AppTopBarComponent {
    token = localStorage.getItem('token');
    selectedEntidad: any;
    nombreUsuario: any;
    rolUsuario: any;
    items: MenuItem[] = [];
    count: number = 0;

    notificacion: MenuItem[] = [];

    entidad: any[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public _authService: AuthService,
        public _entidadeService: EntidadeService,
        public _notificacionService: NotificacionService,
        public _tramitesService: TramitesService,
        private webSocketService: WebSocketService,
        private router: Router,
        public _seguimientoAdminService: SeguimientoAdminService,

    ) {
        this.getEntidadesByUserRol();
    }

    ngOnInit() {
    }

    logout() {
        const token = localStorage.getItem('token');
        this._authService.AuthLogout(token!).subscribe(() => {
            localStorage.removeItem('token');
            this.router.navigate(['auth/login']);
        });
    }

    getEntidadesByUserRol() {
        this._entidadeService.GetEntidadByUserRol(this.token!).subscribe(({ data }) => {
            let rolIdUsuario = data[0].rol_id

            if (data.length > 0 && data[0]?.denominacion) { // si es rol solicitante                    
                this.entidad.push({
                    label: data[0].denominacion,
                    value: data[0].entidad_id
                });

                this.selectedEntidad = this.entidad[0].value;
                this.nombreUsuario = `${data[0].nombre} ${data[0].apellido}`
                this.rolUsuario = `${data[0].rol}`

            } else if (data.length > 0) {
                this.nombreUsuario = `${data[0].nombre} ${data[0].apellido}`
                this.rolUsuario = `${data[0].rol}`
                this._entidadeService.GetEntidades(this.token!).subscribe(({ data }) => {
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
                { label: `${this.nombreUsuario}`, icon: 'pi pi-users' },
                { label: `${this.rolUsuario}`, icon: 'pi pi-wrench' },
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
            ];

            /**************** NOTIFICACIONES ****************/
            // Jefe Unidad
            if (rolIdUsuario !== 1) {
                const tipoUrl = rolIdUsuario === 2 ? 'admin' : rolIdUsuario === 3 ? 'operador' : rolIdUsuario === 4 && 'revisor';
                this.getNotificacionesJefeUnidad();
                this.webSocketService.listenNotificacion((data) => {
                    console.log(data);

                    this.count = data.data;
                    this.notificacion = [
                        {
                            label: `${this.count} Trámite(s) Pendiente(s)`,
                            icon: 'pi pi-envelope',
                            command: () => this.router.navigate([`/${tipoUrl}/ver-tramite`])
                        }
                    ];
                });
            }


        });
    }

    get notificationColor(): string {
        return this.count > 0 ? 'rgb(205 23 53)' : '';
    }

    getNotificacionesJefeUnidad() {
        this._notificacionService.NotificacionJefeUnidad(this.token!).subscribe({
            next(res) {
                console.log("dsddssdsdfsd" + res);

            }
        })
    }

}

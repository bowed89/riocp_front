import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { EntidadeService } from '../shared/services/entidades.service';
import { WebSocketService } from '../shared/services/websocket.service';
import { NotificacionService } from '../shared/services/notificacion.service';
import { TramitesService } from '../modules/solicitante/tramites/services/tramites.service';

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
        private cdRef: ChangeDetectorRef

    ) { }

    ngOnInit() {
        this.getEntidadesByUserRol();
        this.getAllNotificaciones();
        this.webSocketService.listenNotificacion((data) => {
            console.log("notificacionessssss", data.data);
            //this.count = data.data;
            this._tramitesService.notificacionChange = data.data;
            this.getNotificaciones();
            this.cdRef.detectChanges(); // Forzar cambio en la vista

        })
    }


    logout() {
        const token = localStorage.getItem('token');
        this._authService.AuthLogout(token!).subscribe(() => {
            localStorage.removeItem('token');
            this.router.navigate(['auth/login']);
        });
    }

    getEntidadesByUserRol() {
        const token = localStorage.getItem('token');
        this._entidadeService.GetEntidadByUserRol(token!).subscribe(({ data }) => {
            console.log(data);
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
                this._entidadeService.GetEntidades(token!).subscribe(({ data }) => {
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

        });
    }

    getNotificaciones() {
        this.notificacion = [
            { label: `${this._tramitesService.notificacionChange} Trámite(s) Pendiente(s)`, icon: 'pi pi-envelope' }
        ];
    }

    get notificationColor(): string {
        return this._tramitesService.notificacionChange  > 0 ? 'rgb(205 23 53)' : '';
    }

    getAllNotificaciones() {
        this._notificacionService.NotificacionJefeUnidad(this.token!).subscribe({
            next(value) {
            }, error(err) {
                console.error(err);
            },
        })
    }

}

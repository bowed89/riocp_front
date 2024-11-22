import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SeguimientoAdminService } from '../../../tramites/services/seguimiento-admin.service';

@Component({
    templateUrl: './inicio-jefe-unidad.component.html',
})
export class InicioJefeUnidadComponent implements OnInit, OnDestroy {
    token = localStorage.getItem('token');
    derivado: string = '0';
    noDerivado: string = '0';
    inicioActivo: boolean = true;


    title = 'Seguimientos de Jefe de Unidad';
    seguimientos: any[] = [];

    products!: any[];
    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService,
        public _seguimientoAdminService: SeguimientoAdminService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
        });
    }

    ngOnInit() {
        this.contadorAsignado();
        this.getSeguimientos();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    contadorAsignado() {
        this._seguimientoAdminService.GetContadorDerivado(this.token!)
            .subscribe({
                next: ({ data }: any) => {
                    console.log("asasasas", data);
                    if (data?.derivados > 0) {
                        this.derivado = ` +${data.derivados}`;
                    }
                    if (data?.no_derivados > 0) {
                        this.noDerivado = ` +${data.no_derivados}`;
                    }
                },
                error: (err) => {
                    console.error(err);
                }
            })
    }


    getSeguimientos() {
        this._seguimientoAdminService.GetSeguimientosAdministrador(this.token!).subscribe({
            next: ({ data }) => {
                this.seguimientos = data;
                console.log(data);
                
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}

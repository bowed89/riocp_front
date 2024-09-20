import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSeguimientoComponent } from './components/inicio-seguimiento/inicio-seguimiento.component';
import { InicioRoutingModule } from './inicio-routing.module';
// Dashboard
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    InicioSeguimientoComponent,

  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ChartModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    TableModule
  ]
})
export class IniciotoModule { }

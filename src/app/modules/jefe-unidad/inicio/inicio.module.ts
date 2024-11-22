import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';


// Dashboard
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { InicioJefeUnidadComponent } from './components/inicio-jefe-unidad/inicio-jefe-unidad.component';
import { MisTramitesModule } from 'src/app/shared/modules/mis-tramites/mis-tramites.module';
import { InicioPrincipalModule } from 'src/app/shared/modules/inicio/inicio-principal.module';


@NgModule({
  declarations: [
    InicioJefeUnidadComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ChartModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    TableModule,
    MisTramitesModule,
    InicioPrincipalModule  
  ]
})
export class InicioModule { }

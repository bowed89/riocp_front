import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';

import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';

// Dashboard
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    InicioAdminComponent

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
export class InicioModule { }

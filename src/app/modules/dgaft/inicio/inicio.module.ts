import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';

import { InicioDgaftComponent } from './components/inicio-dgaft/inicio-dgaft.component';


// Dashboard
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    InicioDgaftComponent

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

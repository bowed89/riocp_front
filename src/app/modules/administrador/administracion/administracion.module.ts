import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionRoutingModule } from './administracion-routing.module';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolPermisoComponent } from './components/rol-permiso/rol-permiso.component';
import { MenuPermisoComponent } from './components/menu-permiso/menu-permiso.component';
import { MonedaComponent } from './components/moneda/moneda.component';


import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';

import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { EntidadModalComponent } from './modals/entidad/entidad-modal.component';
import { EntidadModificarModalComponent } from './modals/entidad-modificar/entidad-modificar-modal.component';
import { MonedaModalComponent } from './modals/moneda/moneda-modal.component';
import { MonedaModificarModalComponent } from './modals/moneda-modificar/moneda-modificar-modal.component';

// Dashboard
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    UsuariosComponent,
    RolesComponent,
    RolPermisoComponent,
    MenuPermisoComponent,
    EntidadModalComponent,
    EntidadModificarModalComponent,
    MonedaComponent,
    MonedaModalComponent,
    MonedaModificarModalComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ChartModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    ToastModule,
    InputNumberModule
  ]
})
export class AdministracionModule { }

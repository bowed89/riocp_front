import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionRoutingModule } from './administracion-routing.module';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolPermisoComponent } from './components/rol-permiso/rol-permiso.component';
import { MenuPermisoComponent } from './components/menu-permiso/menu-permiso.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { EntidadModalComponent } from './modals/entidad/entidad-modal.component';
import { EntidadModificarModalComponent } from './modals/entidad-modificar/entidad-modificar-modal.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    RolesComponent,
    RolPermisoComponent,
    MenuPermisoComponent,
    EntidadModalComponent,
    EntidadModificarModalComponent
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
    DialogModule
  ]
})
export class AdministracionModule { }

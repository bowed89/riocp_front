import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolPermisoComponent } from './components/rol-permiso/rol-permiso.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'roles', component: RolesComponent },
        { path: 'roles-permisos', component: RolPermisoComponent },

    ])],
    exports: [RouterModule]
})
export class AdministracionRoutingModule { }

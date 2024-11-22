import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolPermisoComponent } from './components/rol-permiso/rol-permiso.component';
import { MenuPermisoComponent } from './components/menu-permiso/menu-permiso.component';
import { InicioAdminsComponent } from '../inicio/components/inicio-admin/inicio-admin.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioAdminsComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'roles', component: RolesComponent },
        { path: 'roles-permisos', component: RolPermisoComponent },
        { path: 'menu-permisos', component: MenuPermisoComponent },
    ])],
    exports: [RouterModule]
})
export class AdministracionRoutingModule { }

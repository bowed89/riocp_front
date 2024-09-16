import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'usuarios', component: UsuariosComponent },

    ])],
    exports: [RouterModule]
})
export class AdministracionRoutingModule { }

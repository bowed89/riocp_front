import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },
        { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
    ])],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }

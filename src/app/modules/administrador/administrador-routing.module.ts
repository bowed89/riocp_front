import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },

    ])],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }

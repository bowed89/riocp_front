import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },
        { path: '', loadChildren: () => import('./tramites/tramites.module').then(m => m.TramitesModule) },

    ])],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }

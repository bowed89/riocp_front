import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
        { path: '', loadChildren: () => import('./tramites/tramites.module').then(m => m.TramitesModule) },

    ])],
    exports: [RouterModule]
})
export class SolicitanteRoutingModule { }

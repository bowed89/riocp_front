import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.IniciotoModule) },
        { path: '', loadChildren: () => import('./tramites/tramites.module').then(m => m.TramitesModule) },

    ])],
    exports: [RouterModule]
})
export class Revisor1RoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },

    ])],
    exports: [RouterModule]
})
export class OperadorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.IniciotoModule) },

    ])],
    exports: [RouterModule]
})
export class SeguimientoRoutingModule { }

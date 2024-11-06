import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MisTramitesComponent } from './components/mis-tramites/mis-tramites.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ver-tramite', component: MisTramitesComponent },

    ])],
    exports: [RouterModule]
})
export class TramitesRoutingModule { }

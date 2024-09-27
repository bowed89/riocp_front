import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioSolicitanteComponent } from './components/inicio-solicitante/inicio-solicitante.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InicioSolicitanteComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

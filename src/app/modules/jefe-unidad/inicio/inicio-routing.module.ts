import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioJefeUnidadComponent } from './components/inicio-jefe-unidad/inicio-jefe-unidad.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioJefeUnidadComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

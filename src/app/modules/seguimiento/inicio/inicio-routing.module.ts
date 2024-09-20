import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioSeguimientoComponent } from './components/inicio-seguimiento/inicio-seguimiento.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioSeguimientoComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

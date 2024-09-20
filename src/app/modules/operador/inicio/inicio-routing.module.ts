import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioOperadorComponent } from './components/inicio-operador/inicio-operador.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioOperadorComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

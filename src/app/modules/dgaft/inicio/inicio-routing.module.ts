import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioDgaftComponent } from './components/inicio-dgaft/inicio-dgaft.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioDgaftComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

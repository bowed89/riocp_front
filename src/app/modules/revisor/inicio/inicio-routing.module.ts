import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioRevisorComponent } from './components/inicio-revisor/inicio-revisor.component';

InicioRevisorComponent
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioRevisorComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioAdminsComponent } from './components/inicio-admin/inicio-admin.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioAdminsComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

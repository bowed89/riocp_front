import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', component: InicioAdminComponent },

    ])],
    exports: [RouterModule]
})
export class InicioRoutingModule { }

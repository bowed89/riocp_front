import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTramiteComponent } from './components/main-tramite/main-tramite.component';
import { FormularioCorrespondenciaComponent } from './components/formulario-correspondencia/formulario-correspondencia.component';
import { FormularioUnoComponent } from './components/formulario-uno/formulario-uno.component';
import { FormularioDosComponent } from './components/formulario-dos/formulario-dos.component';
import { FormularioTresComponent } from './components/formulario-tres/formulario-tres.component';
import { FormularioCuatroComponent } from './components/formulario-cuatro/formulario-cuatro.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'nuevo-tramite',
            component: MainTramiteComponent,
            children: [
                { path: '', redirectTo: 'formulario-uno', pathMatch: 'full' },
                { path: 'formulario-uno', component: FormularioUnoComponent },
                { path: 'formulario-dos', component: FormularioDosComponent },
                { path: 'formulario-tres', component: FormularioTresComponent },
                { path: 'formulario-cuatro', component: FormularioCuatroComponent },
                { path: 'correspondencia', component: FormularioCorrespondenciaComponent },
            ]   
        },
    ])], 
    exports: [RouterModule]
})
export class TramitesRoutingModule { }
/*  */
 
/* @NgModule({
    imports: [RouterModule.forChild([
        
        { path: 'nuevo-tramite', component:  MainTramiteComponent},
        { path: 'nuevo-tramite/correspondencia', component:  FormularioCorrespondenciaComponent},
        { path: 'nuevo-tramite/formulario-uno', component:  FormularioUnoComponent},
        { path: 'nuevo-tramite/formulario-dos', component:  FormularioDosComponent},
        { path: 'nuevo-tramite/formulario-tres', component:  FormularioTresComponent},
        { path: 'nuevo-tramite/formulario-cuatro', component:  FormularioCuatroComponent},

    ])],
    exports: [RouterModule]
})
export class TramitesRoutingModule { }
 */
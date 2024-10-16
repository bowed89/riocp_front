import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTramiteComponent } from './components/main-tramite/main-tramite.component';
import { FormularioCorrespondenciaComponent } from './components/formulario-correspondencia/formulario-correspondencia.component';
import { FormularioUnoComponent } from './components/formulario-uno/formulario-uno.component';
import { FormularioDosComponent } from './components/formulario-dos/formulario-dos.component';
import { FormularioTresComponent } from './components/formulario-tres/formulario-tres.component';
import { FormularioCuatroComponent } from './components/formulario-cuatro/formulario-cuatro.component';
import { AnexoUnoComponent } from './components/anexo-uno/anexo-uno.component';
import { AnexoDosComponent } from './components/anexo-dos/anexo-dos.component';
import { AnexoTresComponent } from './components/anexo-tres/anexo-tres.component';
import { MisTramitesSolicitanteComponent } from './components/mis-tramites/mis-tramites.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ver-tramite', component: MisTramitesSolicitanteComponent },
        {
            path: 'nuevo-tramite',
            component: MainTramiteComponent,
            children: [
                { path: '', redirectTo: 'formulario-uno', pathMatch: 'full' },
                { path: 'formulario-uno', component: FormularioUnoComponent },
                { path: 'formulario-dos', component: FormularioDosComponent },
                { path: 'formulario-tres', component: FormularioTresComponent },
                { path: 'formulario-cuatro', component: FormularioCuatroComponent },
                { path: 'anexo-uno', component: AnexoUnoComponent },
                { path: 'anexo-dos', component: AnexoDosComponent },
                { path: 'anexo-sigep', component: AnexoTresComponent },
                { path: 'correspondencia', component: FormularioCorrespondenciaComponent },
            ],

        },
    ])],
    exports: [RouterModule]
})
export class TramitesRoutingModule { }

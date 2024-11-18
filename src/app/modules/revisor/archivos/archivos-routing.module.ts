import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubirArchivoComponent } from './components/subir-deuda-publica-externa/subir-archivo.component';
import { SubirFndrComponent } from './components/subir-fndr/subir-fndr.component';
import { SubirBalanceGeneralComponent } from './components/subir-balance-general/subir-balance-general.component';
import { SubirIcrEtaComponent } from './components/subir-icr-eta/subir-icr-eta.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'subir-deuda-publica-externa', component: SubirArchivoComponent },
        { path: 'subir-fndr', component: SubirFndrComponent },
        { path: 'subir-balance-general', component: SubirBalanceGeneralComponent },
        { path: 'subir-promedio-icr-eta-up', component: SubirIcrEtaComponent },

    ])],
    exports: [RouterModule]
})
export class ArchivosRoutingModule { }

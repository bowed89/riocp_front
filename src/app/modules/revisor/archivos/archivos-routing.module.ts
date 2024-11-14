import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubirArchivoComponent } from './components/subir-deuda-publica-externa/subir-archivo.component';
import { SubirFndrComponent } from './components/subir-fndr/subir-fndr.component';
import { SubirBalanceGeneralComponent } from './components/subir-balance-general/subir-balance-general.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'subir-deuda-publica-externa', component: SubirArchivoComponent },
        { path: 'subir-fndr', component: SubirFndrComponent },
        { path: 'subir-balance-general', component: SubirBalanceGeneralComponent },

    ])],
    exports: [RouterModule]
})
export class ArchivosRoutingModule { }

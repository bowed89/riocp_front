import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivosRoutingModule } from './archivos-routing.module';

import { SubirArchivoComponent } from './components/subir-deuda-publica-externa/subir-archivo.component';
import { SubirFndrComponent } from './components/subir-fndr/subir-fndr.component';
import { SubirBalanceGeneralComponent } from './components/subir-balance-general/subir-balance-general.component';
import { SubirIcrEtaComponent } from './components/subir-icr-eta/subir-icr-eta.component';

import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    SubirArchivoComponent,
    SubirFndrComponent,
    SubirBalanceGeneralComponent,
    SubirIcrEtaComponent
  ],
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    FileUploadModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class ArchivosModule {}

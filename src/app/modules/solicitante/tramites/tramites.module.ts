import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTramiteComponent } from './components/main-tramite/main-tramite.component';
import { TramitesRoutingModule } from './tramites-routing.module';
import { StepsModule } from 'primeng/steps';
import { FormularioCorrespondenciaComponent } from './components/formulario-correspondencia/formulario-correspondencia.component';
import { FormularioUnoComponent } from './components/formulario-uno/formulario-uno.component';
import { FormularioDosComponent } from './components/formulario-dos/formulario-dos.component';
import { FormularioTresComponent } from './components/formulario-tres/formulario-tres.component';
import { FormularioCuatroComponent } from './components/formulario-cuatro/formulario-cuatro.component';

import { TabMenuModule } from 'primeng/tabmenu';
//Importa el módulo InputText de PrimeNG
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'; 
import { ToastModule } from 'primeng/toast'; 
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    MainTramiteComponent,
    FormularioCorrespondenciaComponent,
    FormularioUnoComponent,
    FormularioDosComponent,
    FormularioTresComponent,
    FormularioCuatroComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TramitesRoutingModule,
    StepsModule,
    TabMenuModule,
    InputTextModule, 
    ButtonModule,   
    ToastModule,
    FileUploadModule,
    InputTextareaModule,
    CheckboxModule,
    TableModule,
    RadioButtonModule
  ]
})
export class TramitesModule {


}

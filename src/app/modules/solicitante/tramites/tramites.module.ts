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
import { AnexosComponent } from './components/anexos/anexos.component';
import { AnexoUnoComponent } from './components/anexo-uno/anexo-uno.component';
import { AnexoDosComponent } from './components/anexo-dos/anexo-dos.component';
import { AnexoTresComponent } from './components/anexo-tres/anexo-tres.component';


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
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api'; // Importa el servicio


@NgModule({
  declarations: [
    MainTramiteComponent,
    FormularioCorrespondenciaComponent,
    FormularioUnoComponent,
    FormularioDosComponent,
    FormularioTresComponent,
    FormularioCuatroComponent,
    AnexosComponent,
    AnexoUnoComponent,
    AnexoDosComponent,
    AnexoTresComponent
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
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ProgressSpinnerModule,
    CalendarModule,
    ConfirmDialogModule,

  ],
  providers: [
    ConfirmationService // Agrega el servicio aquí
  ] 
})
export class TramitesModule {


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioUnoComponent } from './formulario-uno/formulario-uno.component';
import { FormularioDosComponent } from './formulario-dos/formulario-dos.component';
import { FormularioTresComponent } from './formulario-tres/formulario-tres.component';
import { FormularioCuatroComponent } from './formulario-cuatro/formulario-cuatro.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    FormularioUnoComponent,
    FormularioDosComponent,
    FormularioTresComponent,
    FormularioCuatroComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    ToastModule,
    RadioButtonModule,
    InputNumberModule,
    FileUploadModule,
    CalendarModule,
    DialogModule,

  ],
  exports: [
    FormularioUnoComponent,
    FormularioDosComponent,
    FormularioTresComponent,
    FormularioCuatroComponent,
  ]
})

export class FormularioSharedModule { }

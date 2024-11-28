import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 


import { RevisarRequisitosComponent } from './revisar-requisitos/revisar-requisitos.component';
import { DerivarComponent } from './derivar/derivar.component';
import { RevisarTecnicoComponent } from './revisar-tecnico/revisar-tecnico.component';
import { CertificadoRiocpComponent } from './certificado-riocp/certificado-riocp.component';
import { NotaRechazoComponent } from './nota-rechazo/nota-rechazo.component';

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
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    RevisarRequisitosComponent,
    DerivarComponent,
    RevisarTecnicoComponent,
    CertificadoRiocpComponent,
    NotaRechazoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    InputTextareaModule

  ], exports: [
    RevisarRequisitosComponent,
    DerivarComponent,
    RevisarTecnicoComponent,
    CertificadoRiocpComponent,
    NotaRechazoComponent
  ]
})
export class BodyModalsModule { }

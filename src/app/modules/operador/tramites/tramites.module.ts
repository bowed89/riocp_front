import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TramitesRoutingModule } from './tramites-routing.module';
import { MisTramitesComponent } from './components/mis-tramites/mis-tramites.component';
import { DerivarModalComponent } from './modals/derivar/derivar-modal.component';

import { FormularioSharedModule } from 'src/app/shared/modules/formularios-views/formularios.shared.module';
import { BodyModalsModule } from 'src/app/shared/modules/body-modals/body-modals.module';
import { MisTramitesModule } from 'src/app/shared/modules/mis-tramites/mis-tramites.module';

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
    MisTramitesComponent,
    DerivarModalComponent,

  ],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    RadioButtonModule,
    InputNumberModule,
    FileUploadModule,
    CalendarModule,
    FormularioSharedModule,
    BodyModalsModule,
    MisTramitesModule
  ]
})
export class TramitesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TramitesRoutingModule } from './tramites-routing.module';
import { MisTramitesComponent } from './components/mis-tramites/mis-tramites.component';

import { DerivarModalComponent } from './modals/derivar/derivar-modal.component';
import { DerivarRevisorModalComponent } from './modals/derivar-revisor/derivar-revisor-modal.component';

import { BodyModalsModule } from 'src/app/shared/modules/body-modals/body-modals.module';
import { MisTramitesModule } from 'src/app/shared/modules/mis-tramites/mis-tramites.module';


import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormularioSharedModule } from "../../../shared/modules/formularios-views/formularios.shared.module";


@NgModule({
  declarations: [
    MisTramitesComponent,
    DerivarModalComponent,
    DerivarRevisorModalComponent
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
    BodyModalsModule,
    MisTramitesModule,
    FormularioSharedModule
]
})
export class TramitesModule { }

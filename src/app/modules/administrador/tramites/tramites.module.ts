import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TramitesRoutingModule } from './tramites-routing.module';
import { MisTramitesComponent } from './components/mis-tramites/mis-tramites.component';
import { DerivarModalComponent } from './modals/derivar/derivar-modal.component';

import { BodyModalsModule } from 'src/app/shared/modules/body-modals/body-modals.module';


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


@NgModule({
  declarations: [
    MisTramitesComponent,
    DerivarModalComponent
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
    BodyModalsModule
  ]
})
export class TramitesModule { }

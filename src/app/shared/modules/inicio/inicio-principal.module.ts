import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { TotalSolicitudesComponent } from './total-solicitudes/total-solicitudes.component';
@NgModule({
  declarations: [
    NotificacionesComponent,
    TotalSolicitudesComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
  ],
  exports: [
    NotificacionesComponent,
    TotalSolicitudesComponent

  ]
})
export class InicioPrincipalModule { }

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguimientoAdminService } from '../../services/seguimiento-admin.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})
export class DerivarModalComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  activeTab: string = 'tab1'; // Para manejar la pestaña activa
  tecnicos: any[] = [];
  revisores: any[] = [];
  token = localStorage.getItem('token');

  seguimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _seguimientoAdminService: SeguimientoAdminService,
    public _messagesService: MessagesService,
  ) {
    // Inicializar el FormGroup
    this.seguimientoForm = this.fb.group({
      id_seguimiento: [this.selectedSeguimiento],
      observacion: ['', Validators.required],
      nro_hoja_ruta: ['', Validators.required],
      solicitud_id: [this.selectedSolicitud],
      usuario_destino_id: ['', Validators.required],
      observacion_revisor: ['', Validators.required],
      usuario_destino_id_revisor: ['', Validators.required]
    });
  }
  ngOnChanges(): void {
    console.log("this.selectedSolicitud ===>", this.selectedSolicitud);
    console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);
    this.seguimientoForm.patchValue({
      solicitud_id: this.selectedSolicitud,
      id_seguimiento: this.selectedSeguimiento
    });
  }

  ngOnInit(): void {
    this.getAllTecnicos();
    this.getAllRevisores();
  }

  getAllTecnicos() {
    this._seguimientoAdminService.GetTecnicos(this.token!).subscribe({
      next: ({ data }) => {
        this.tecnicos = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));
      },
    });
  }

  getAllRevisores() {
    this._seguimientoAdminService.GetRevisores(this.token!).subscribe({
      next: ({ data }) => {
        this.revisores = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));
      },
    });
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    if (this.seguimientoForm.valid) {
      console.log(this.seguimientoForm.value);
      
      this._seguimientoAdminService.PostSeguimientoAdmin(this.seguimientoForm.value, this.token!).subscribe({
        next: ({ message }) => {
          this._messagesService.MessageSuccess('Formulario Agregado', message!);
          this.seguimientoChanged.emit();
          this.closeModal();
        },
        error: (error) => {
          this._messagesService.MessageError('Error al Agregar', error.error.message);
          this.closeModal();
        },
      });
    } else {
      this._messagesService.MessageError('Formulario inválido', 'Por favor complete todos los campos requeridos.');
    }
  }
}

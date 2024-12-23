import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguimientoAdminService } from '../../services/seguimiento-admin.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})
export class DerivarModalComponent implements OnInit {
  tipoRol = '';
  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;
  @Input() selectedIdRolOrigen: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  activeTab: string = 'tab1'; // Para manejar la pestaña activa
  listadoRol: any[] = [];
  token = localStorage.getItem('token');


  seguimientoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _seguimientoAdminService: SeguimientoAdminService,
    public _messagesService: MessagesService,
    private cdRef: ChangeDetectorRef
  ) {
    this.seguimientoForm = this.fb.group({
      id_seguimiento: [null],
      observacion: [''],
     // nro_hoja_ruta: [''],
      solicitud_id: [null],
      usuario_destino_id: ['']
    });
  }

  ngOnChanges(): void {

    if (this.selectedSolicitud !== undefined) {
      console.log("this.selectedSolicitud ===>", this.selectedSolicitud);
      console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);
      console.log("this.selectedIdRolOrigen ===>", this.selectedIdRolOrigen);

      this.seguimientoForm.patchValue({
        solicitud_id: this.selectedSolicitud,
        id_seguimiento: this.selectedSeguimiento
      });


      if (this.selectedIdRolOrigen === 1) {
        this.tipoRol = 'Técnico';
        // Inicializar el FormGroup
        this.seguimientoForm = this.fb.group({
          id_seguimiento: [this.selectedSeguimiento],
          observacion: ['DERIVAR A TÉCNICO SELECCIONADO', Validators.required],
          //nro_hoja_ruta: ['', Validators.required],
          solicitud_id: [this.selectedSolicitud],
          usuario_destino_id: ['', Validators.required],
        });

        this.getAllTecnicos();

      } else {
        this.tipoRol = 'DGAFT';
        this.seguimientoForm = this.fb.group({
          id_seguimiento: [this.selectedSeguimiento],
          observacion: ['DERIVAR A DIRECTOR(A) DGAFT', Validators.required],
          solicitud_id: [this.selectedSolicitud],
          usuario_destino_id: ['', Validators.required],
        });
        this.getAllDgaft();
      }
    }
  }

  ngOnInit(): void {
  }

  getAllTecnicos() {
    this._seguimientoAdminService.GetTecnicos(this.token!).subscribe({
      next: ({ data }) => {
        this.listadoRol = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));
      },
    });
  }

  getAllDgaft() {
    this._seguimientoAdminService.GetDgaft(this.token!).subscribe({
      next: ({ data }) => {
        this.listadoRol = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));
      },
    });
  }

  closeModal(flag?: boolean) {
    this.visible = flag ?? false;
    this.visibleChange.emit(this.visible);
    this.cdRef.detectChanges();
  }

  onSubmit() {
    console.log(this.seguimientoForm.value);

    if (this.seguimientoForm.valid) {
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
    }
  }
}

import { Component, EventEmitter, Input, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SeguimientoRevisorService } from '../../services/seguimiento-revisor.service';
import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';
import { SeguimientoOperadorService } from 'src/app/modules/operador/tramites/services/seguimiento-operador.service';
import { ObservacionRevisorService } from '../../services/observacion-revisor.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})
export class DerivarModalComponent implements OnInit {
  tipoRol = 'Jefe Unidad';

  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  // submodales
  form1ModalVisible: boolean = false; // Para el modal de documentos
  form2ModalVisible: boolean = false;
  form3ModalVisible: boolean = false;
  form4ModalVisible: boolean = false;

  selectedSolicitudForm: any

  activeTab: string = 'tab1'; // Para manejar la pestaña activa

  tecnicos: any[] = [];
  token = localStorage.getItem('token');

  seguimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _seguimientoRevisorService: SeguimientoRevisorService,
    public _messagesService: MessagesService,
    public _abrirDocumentoService: AbrirDocumentoService,
    public _observacionRevisorService: ObservacionRevisorService,
    private cdRef: ChangeDetectorRef
  ) {
    // Crear el formulario reactivo
    this.seguimientoForm = this.fb.group({
      usuario_destino_id: [null, Validators.required],
      observacion: ['DERIVAR A JEFE DE UNIDAD', Validators.required],
      solicitud_id: [null],
      id_seguimiento: [null],
      observaciones: this.fb.array([]),
      observacion_tecnico: this.fb.array([])
    });
  }

  ngOnChanges(): void {
    console.log("this.selectedSolicitud** ===>", this.selectedSolicitud);
    console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);

    if (this.selectedSolicitud !== undefined) {
    }

    this.seguimientoForm.patchValue({
      solicitud_id: this.selectedSolicitud,
      id_seguimiento: this.selectedSeguimiento
    });
  }

  ngOnInit(): void {
    this._seguimientoRevisorService.GetJefeUnidad(this.token!).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.tecnicos = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));
      }
    });

    // Asignar valores iniciales a los controles
    if (this.selectedSolicitud) {
      this.seguimientoForm.patchValue({ solicitud_id: this.selectedSolicitud });
    }
    if (this.selectedSeguimiento) {
      this.seguimientoForm.patchValue({ id_seguimiento: this.selectedSeguimiento });
    }
  }

  changeModal(tab: string) {
    this.activeTab = tab;
    this.getTipoObservacion();
    this.observationTecnicoFormArray.clear();
  }

  abrirModales(i: number) {
    if (i === 0) {
      this.openDocumentoCorrespondencia(this.selectedSolicitud, 'carta_solicitud');
    }
    if (i === 1) {
      this.form1ModalVisible = true;
      this.selectedSolicitudForm = this.selectedSolicitud;
    }
    if (i === 2) {
      const idTipo = 1;
      this.openDocument(this.selectedSolicitud, idTipo, 'cronograma_pagos');
    }
    if (i === 3) {
      const idTipo = 2;
      this.openDocument(this.selectedSolicitud, idTipo, 'cronograma_desembolso');
    }
    if (i === 4) {
      this.form2ModalVisible = true;
      this.selectedSolicitudForm = this.selectedSolicitud;
    }
    if (i === 5) {
      const idTipo = 4;
      this.openDocument(this.selectedSolicitud, idTipo, 'certificado_no_vigente');
    }
    if (i === 6) {
      this.form3ModalVisible = true;
      this.selectedSolicitudForm = this.selectedSolicitud;
    }
    if (i === 7) {
      this.form4ModalVisible = true;
      this.selectedSolicitudForm = this.selectedSolicitud;
    }
    if (i === 8) {
      const idTipo = 3;
      this.openDocument(this.selectedSolicitud, idTipo, 'informacion_financiera');
    }
  }

  getTipoObservacion() {

    if (this.observationsFormArray.length === 0) {
      this._observacionRevisorService.GetTecnicoObservacion(this.token!, this.selectedSolicitud).subscribe({
        next: ({ data }: any) => {
          data.forEach((res: any) => {
            this.observationsFormArray.push(this.fb.group({
              enumeracion: [`${res.enumeracion}.`],
              cumple: [res.cumple, Validators.required],
              descripcion: [res.tipo_observacion, Validators.required],
              tipo_observacion_id: [res.tipo_observacion_id, Validators.required],
              observacion: [res.observacion, Validators.required]
            }));
          });
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  get observationsFormArray(): FormArray {
    return this.seguimientoForm.get('observaciones') as FormArray;
  }

  get observationTecnicoFormArray(): FormArray {
    return this.seguimientoForm.get('observacion_tecnico') as FormArray;
  }

  openDocument(idSolicitud: number, idTipo: number, nombreDoc: string) {
    this._abrirDocumentoService.GetDocumento(this.token!, idSolicitud, idTipo).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: response.type });
        const downloadURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadURL;

        const extension = response.type === 'application/pdf' ? 'pdf' :
          response.type === 'application/vnd.ms-excel' ? 'xls' :
            response.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? 'xlsx' :
              'unknown';

        if (extension !== 'unknown') {
          a.download = `${nombreDoc}.${extension}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

        } else {
          this._messagesService.MessageError('Documento Adjunto', `No existe un documento adjunto de tipo ${nombreDoc}`);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openDocumentoCorrespondencia(id: number, nombreDoc: string) {
    this._abrirDocumentoService.GetFormularioCorrespondencia(this.token!, id).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nombreDoc}.pdf`;
        a.click();
      }, error: (err) => {
        console.log(err);
      }
    })
  };

  closeModal(flag?: boolean) {
    console.log(flag);
    this.visible = flag ?? false;
    this.visibleChange.emit(this.visible);
    this.cdRef.detectChanges(); // Fuerza la detección de cambios
  }

  onSubmit() {
    if (this.seguimientoForm.valid) {
      console.log(this.seguimientoForm.value);
      this._seguimientoRevisorService.PostAsignarRevisorJefeUnidad(this.seguimientoForm.value, this.token!)
        .subscribe({
          next: ({ message }) => {
            this._messagesService.MessageSuccess('Solicitud Dervidada', message!);
            this.seguimientoChanged.emit();
            this.closeModal();
          },
          error: (error) => {
            this._messagesService.MessageError('Error al Dervivar', error.error.message);
            this.closeModal();
          },
        });
    } else {
      this._messagesService.MessageError('Formulario inválido', 'Por favor complete todos los campos requeridos.');
    }
  }
}


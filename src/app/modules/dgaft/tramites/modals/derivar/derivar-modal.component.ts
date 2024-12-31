import { Component, EventEmitter, Input, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SeguimientoOperadorService } from '../../services/seguimiento-dgaft.service';
import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})

export class DerivarModalComponent implements OnInit {
  tipoRol = 'vctp';
  rolRevisarObservacion = 'DGAFT'; // rol que envia la solicitud


  // submodales
  form1ModalVisible: boolean = false; // Para el modal de documentos
  form2ModalVisible: boolean = false;
  form3ModalVisible: boolean = false;
  form4ModalVisible: boolean = false;

  selectedSolicitudForm: any;
  hoja_ruta = false;

  activeTab: string = 'tab1'; // Para manejar la pestaña activa

  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  tecnicos: any[] = [];
  token = localStorage.getItem('token');
  seguimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _seguimientoOperadorService: SeguimientoOperadorService,
    public _messagesService: MessagesService,
    public _abrirDocumentoService: AbrirDocumentoService,
    private cdRef: ChangeDetectorRef
  ) {
    // Crear el formulario reactivo
    this.seguimientoForm = this.fb.group({
      usuario_destino_id: [null, Validators.required],
      observacion: ['DERIVAR A REVISOR', Validators.required],
      solicitud_id: [null],
      id_seguimiento: [null],
      observaciones: this.fb.array([])
    });
  }

  ngOnChanges(): void {
    this.activeTab = 'tab1'; // siempre inicia en la primera pestaña
    console.log("this.selectedSolicitud ===>", this.selectedSolicitud);
    console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);

    this.seguimientoForm.patchValue({
      solicitud_id: this.selectedSolicitud,
      id_seguimiento: this.selectedSeguimiento
    });
  }

  ngOnInit(): void {

    this._seguimientoOperadorService.GetVctp(this.token!).subscribe({
      next: ({ data }) => {

        console.log("dataaaa vctp ==>" + data);
        
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

  closeModal(flag?: boolean) {
    this.visible = flag ?? false;

    this.seguimientoForm.reset();

    // Limpieza del FormArray
    while (this.observationsFormArray.length !== 0) {
      this.observationsFormArray.removeAt(0);
    }

    this.activeTab = ''; // al cerrar la pestaña se limpia
    //this.rolRevisarObservacion = '';
    this.visibleChange.emit(this.visible);
    this.cdRef.detectChanges(); // Fuerza la detección de cambios
  }

  abrirModales(i: any) {
    console.log(i);

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

  get observationsFormArray(): FormArray {
    return this.seguimientoForm.get('observaciones') as FormArray;
  }


  openDocument(idSolicitud: number, idTipo: number, nombreDoc: string) {
    this._abrirDocumentoService.GetDocumento(this.token!, idSolicitud, idTipo).subscribe({
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

  onSubmit() {

    console.log(this.seguimientoForm.value);
    
    return;
    
    if (this.seguimientoForm.valid) {
      console.log(this.seguimientoForm.value);
      this._seguimientoOperadorService.PostTipoObservacion(this.seguimientoForm.value, this.token!).subscribe({
        next: ({ message }) => {
          this._messagesService.MessageSuccess('Observación Agregada', message!);
          this.seguimientoChanged.emit();
          this.closeModal();
        },
        error: (error) => {
          this._messagesService.MessageError('Error al Agregar', error.error.message);
          this.closeModal();
        },
      });

    } else {
      this._messagesService.MessageError('Observación inválida', 'Por favor complete todos los campos requeridos.');
    }
  }



}




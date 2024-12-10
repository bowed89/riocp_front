import { Component, EventEmitter, Input, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SeguimientoOperadorService } from '../../services/seguimiento-operador.service';
import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})

export class DerivarModalComponent implements OnInit {
  tipoRol = 'Revisor(a)';

  // submodales
  form1ModalVisible: boolean = false; // Para el modal de documentos
  form2ModalVisible: boolean = false;
  form3ModalVisible: boolean = false;
  form4ModalVisible: boolean = false;

  selectedSolicitudForm: any

  // desactivar boton de la siguiente pestaña certificado riocp
  botonRiocp: boolean = true;
  botonNota: boolean = false;
  botonDerivar: boolean = false;

  // desactivar boton de la siguiente pestaña nota de rechazo
  tipoNotaRiocp: string = "APROBACIÓN";

  activeTab: string = 'tab1'; // Para manejar la pestaña activa

  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  // intermediario para pasar sd y vpd desde componente certificado-riocp a nota-rechazo
  sd: any;
  vpd: any;

  valoresHijo: any;  // Para almacenar los valores del formulario hijo


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
      solicitud_id: [null], // tambien cuenta solicitud RIOCP *
      id_seguimiento: [null],
      observaciones: this.fb.array([]),

      // Campos del formulario del certificado RIOCP *
      identificador_id: [null],
      nro_solicitud: [null],
      codigo: [''],
      entidad: [''],
      objeto_operacion_credito: [''],
      acreedor: [''],
      monto_total: [''],
      moneda: [''],
      interes_anual: [''],
      comision: [''],
      plazo: [''],
      periodo_gracia: [''],
      servicio_deuda: [''],
      valor_presente_deuda_total: [''],

      // nota
      fecha: ['', Validators.required],
      nro_nota: ['', Validators.required],
      header: ['', Validators.required],
      referencia: ['', Validators.required],
      body: ['', Validators.required],
      remitente: ['', Validators.required],
      revisado: ['', Validators.required],

      // observacion
      esObservado: [false, Validators.required],
    });
  }

  ngOnChanges(): void {
    console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);
    console.log("this.selectedSolicitud ===>", this.selectedSolicitud);

    if (this.selectedSolicitud !== undefined) {
      //this.getTipoObservacion();

      this.seguimientoForm.patchValue({
        solicitud_id: this.selectedSolicitud,
        id_seguimiento: this.selectedSeguimiento
      });
    }

  }

  ngOnInit(): void {
    this.getTipoObservacion();

    console.log('entra a derivar-modal');
    this._seguimientoOperadorService.GetRevisores(this.token!).subscribe({
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

  capturarSD(dato: any) {
    this.sd = dato;
  }
  capturarVPD(dato: any) {
    this.vpd = dato;
  }

  closeModal(flag?: boolean) {
    this.visible = flag ?? false;

    this.seguimientoForm.reset();
    this.observationsFormArray.clear();

    this.visibleChange.emit(this.visible);
    this.cdRef.detectChanges(); // Fuerza la detección de cambios
  }

  // Método para manejar el evento
  actualizarEstadoBotonRiocp(estado: boolean) {
    this.botonRiocp = estado;
    console.log('Estado recibido desde el hijo actualizarEstadoBotonRiocp:', estado);

    if (estado) {
      // SI NO EXISTEN OBSERVACIONES
      this.botonNota = false;
      this.botonDerivar = false; // desactivo el btn derivar

      this.seguimientoForm.patchValue({ esObservado: false });
      // Cambiar validadores para los campos DE CERTIFICADO RIOCP
      this.seguimientoForm.get('identificador_id')?.setValidators([Validators.required]);
      this.seguimientoForm.get('nro_solicitud')?.setValidators([Validators.required]);
      this.seguimientoForm.get('codigo')?.setValidators([Validators.required]);
      this.seguimientoForm.get('entidad')?.setValidators([Validators.required]);
      this.seguimientoForm.get('objeto_operacion_credito')?.setValidators([Validators.required]);
      this.seguimientoForm.get('acreedor')?.setValidators([Validators.required]);
      this.seguimientoForm.get('monto_total')?.setValidators([Validators.required]);
      this.seguimientoForm.get('moneda')?.setValidators([Validators.required]);
      this.seguimientoForm.get('interes_anual')?.setValidators([Validators.required]);
      this.seguimientoForm.get('comision')?.setValidators([Validators.required]);
      this.seguimientoForm.get('plazo')?.setValidators([Validators.required]);
      this.seguimientoForm.get('periodo_gracia')?.setValidators([Validators.required]);
      this.seguimientoForm.get('servicio_deuda')?.setValidators([Validators.required]);
      this.seguimientoForm.get('valor_presente_deuda_total')?.setValidators([Validators.required]);

    } else {
      // SI EXISTEN OBSERVACIONES
      this.seguimientoForm.patchValue({ esObservado: true });
      this.botonNota = true;
      this.botonDerivar = false;

    }
  }

  obtenerBotonNota(valor: any) {
    this.botonNota = valor;
  }

  obtenerBotonDerivar(valor: any) {
    this.botonDerivar = valor;
  }

  obtenerTipoNotaRiocp(tipo: string) {
    this.tipoNotaRiocp = tipo;
    console.log('Tipo recibido desde el hijo obtenerTipoNotaRiocp:', tipo);
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

  getTipoObservacion() {
    this._seguimientoOperadorService.GetTipoObservacion(this.token!).subscribe({
      next: ({ data }: any) => {
        data.forEach((res: any) => {
          this.observationsFormArray.push(this.fb.group({
            enumeracion: [`${res.enumeracion}.`],
            cumple: [1, Validators.required],
            descripcion: [res.observacion, Validators.required],
            tipo_observacion_id: [res.id, Validators.required],
            observacion: ['SIN OBSERVACIONES', Validators.required]
          }));
        });
      },
      error(err) {
        console.error(err);
      },
    });
  }

  get observationsFormArray(): FormArray {
    return this.seguimientoForm.get('observaciones') as FormArray;
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

  onSubmit() {
    console.log(this.seguimientoForm.value);
    
    if (this.seguimientoForm.valid) {

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

import { Component, EventEmitter, Input, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';

import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';
import { SeguimientoOperadorService } from 'src/app/modules/operador/tramites/services/seguimiento-operador.service';
import { SeguimientoRevisorService } from 'src/app/modules/revisor/tramites/services/seguimiento-revisor.service';
import { SeguimientoAdminService } from '../../services/seguimiento-admin.service';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
    selector: 'app-derivar-revisor-modal',
    templateUrl: './derivar-revisor-modal.component.html',
    styleUrls: ['./derivar-revisor-modal.component.scss']
})

export class DerivarRevisorModalComponent implements OnInit {
    tipoRol = 'dgaft';
    rolRevisarObservacion = 'JEFE UNIDAD'; // rol que envia la solicitud

    // submodales
    form1ModalVisible: boolean = false; // Para el modal de documentos
    form2ModalVisible: boolean = false;
    form3ModalVisible: boolean = false;
    form4ModalVisible: boolean = false;

    selectedSolicitudForm: any

    // desactivar boton de la siguiente pestaña certificado riocp
    botonRiocp: boolean = false;
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
        public _seguimientoRevisorService: SeguimientoRevisorService,
        public _messagesService: MessagesService,
        public _abrirDocumentoService: AbrirDocumentoService,
        public _seguimientoAdminService: SeguimientoAdminService,
        private cdRef: ChangeDetectorRef,
        private _notaCertificadoRiocpService: NotaCertificadoRiocpService,

    ) {
        // Crear el formulario reactivo
        this.seguimientoForm = this.fb.group({
            usuario_destino_id: [null, Validators.required],
            observacion: ['DERIVAR A JEFE DE UNIDAD', Validators.required],
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

            // revision si cometio errores en la revision el rol "revisor"
            tieneErrores: [false, Validators.required],
            comentario: [null],
            tipo_error_id: [null],

            // observacion tecnico
            observacion_tecnico: this.fb.array([])
        });
    }

    ngOnChanges(): void {
        this.activeTab = 'tab1'; // siempre inicia en la primera pestaña

        console.log("this.selectedSeguimiento ===>", this.selectedSeguimiento);
        console.log("this.selectedSolicitud ===>", this.selectedSolicitud);

        if (this.selectedSolicitud !== undefined) {
            if (this.observationsFormArray.length === 0) {
                // this.getTipoObservacion();
            }

            this.seguimientoForm.patchValue({
                solicitud_id: this.selectedSolicitud,
                id_seguimiento: this.selectedSeguimiento
            });
        }
    }

    ngOnInit(): void {
        this.GetListadoDgaft(); // listado de  DGAFT para seleccionar cuando derive

        // Asignar valores iniciales a los controles
        if (this.selectedSolicitud) {
            this.seguimientoForm.patchValue({ solicitud_id: this.selectedSolicitud });
        }
        if (this.selectedSeguimiento) {
            this.seguimientoForm.patchValue({ id_seguimiento: this.selectedSeguimiento });
        }
    }

    get observationTecnicoFormArray(): FormArray {
        return this.seguimientoForm.get('observacion_tecnico') as FormArray;
    }

    capturarSD(dato: any) {
        this.sd = dato;
    }
    capturarVPD(dato: any) {
        this.vpd = dato;
    }

    closeModal(flag?: boolean) {
        console.log('closeModal', this.observationsFormArray.length);

        this.visible = flag ?? false;

        // al cerrar ventana lo ponemos los valores de los btn de las pestañas por defecto
        this.botonRiocp = true;
        this.botonNota = false;
        this.botonDerivar = false;

        // limpia la variable de las notas
        this._notaCertificadoRiocpService.cargarUnaVezNota = '';

        // Reseteo del formulario con valores iniciales
        this.seguimientoForm.reset({
            usuario_destino_id: null,
            observacion: 'DERIVAR A JEFE UNIDAD',
            solicitud_id: null,
            id_seguimiento: null,
            fecha: '',
            nro_nota: '',
            header: '',
            referencia: '',
            body: '',
            remitente: '',
            revisado: '',
            esObservado: false,
            tieneErrores: false,
        });

        // Limpieza del FormArray
        while (this.observationsFormArray.length !== 0) {
            this.observationsFormArray.removeAt(0);
        }

        this.activeTab = ''; // al cerrar la pestaña se limpia
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

    GetListadoDgaft() {
        this._seguimientoAdminService.GetDgaft(this.token!).subscribe({
            next: ({ data }) => {
                console.log(data);
                this.tecnicos = data.map((tecnico: any) => ({
                    nombre: `${tecnico.nombre} ${tecnico.apellido}`,
                    id: tecnico.id
                }));
            }
        });
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
        this.convertirBrHtml();
        console.log("despues ==>", this.seguimientoForm.value);

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

    // convertir de '\n' a '<br>' en el html de body y header
    convertirBrHtml() {
        const textoBodyOriginal = this.seguimientoForm.get('body')?.value;
        let textoBodyConBr = textoBodyOriginal.replace(/\n/g, '<br>');

        const textoHeaderOriginal = this.seguimientoForm.get('header')?.value;
        let textoHeaderConBr = textoBodyOriginal.replace(/\n/g, '<br>');

        this.seguimientoForm.patchValue({
            body: textoBodyConBr,
            header: textoHeaderConBr
        });
        
    }

}

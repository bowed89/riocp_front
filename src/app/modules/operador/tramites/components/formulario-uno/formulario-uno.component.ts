import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcreedoresService } from 'src/app/shared/services/acreedores.service';
import { EntidadeService } from 'src/app/shared/services/entidades.service';
import { MonedasService } from 'src/app/shared/services/monedas.service';
import { PeriodoService } from 'src/app/shared/services/periodos.service';
import { FirmaDigitalService } from 'src/app/shared/services/firma-digital.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SolicitudService } from 'src/app/modules/solicitante/tramites/services/solicitud.service';
import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';

@Component({
  selector: 'app-formulario-uno-view',
  templateUrl: './formulario-uno.component.html',
  styleUrls: ['./formulario-uno.component.scss']
})
export class FormularioUnoComponent {
  // MODAL
  @Input() visibleForm1: boolean = false;
  @Input() selectedSolicitudForm: any;

  @Output() visibleForm1Change: EventEmitter<boolean> = new EventEmitter<boolean>();

  inputWidth = 100; // Ancho inicial del input en píxeles

  solicitudForm!: FormGroup;
  token = localStorage.getItem('token');
  fechaActual: string = '';
  // Datoe Entidad
  nombreEntidad: string = '';
  numEntidad: number = 0;
  idEntidad: number = 0;

  acreedores: any[] = [{ name: '', code: '' }];
  monedas: any[] = [];
  periodos: any[] = [];
  // Comisiones
  comisionConcepto: string = '';
  comisionTasa: any;

  formularioLlenada: boolean = false;
  spinnerFirma: boolean = false;
  firmaValido: boolean = false;
  firmaNoValido: boolean = false;
  firmaNombre = '';
  firmaInicioValidez = '';
  firmaFinValidez = '';

  constructor(
    private fb: FormBuilder,
    public _entidadeService: EntidadeService,
    public _acreedoresService: AcreedoresService,
    public _monedasService: MonedasService,
    public _periodoService: PeriodoService,
    public _firmaDigitalService: FirmaDigitalService,
    public _solicitudService: SolicitudService,
    public _messagesService: MessagesService,
    public _abrirDocumentoService: AbrirDocumentoService

  ) {
    this.solicitudForm = this.fb.group({
      entidad_id: ['', Validators.required],
      identificador_id: ['', Validators.required],
      acreedor_id: ['', Validators.required],
      monto_total: [null, Validators.required],
      moneda_id: ['', Validators.required],
      plazo: [null, Validators.required],
      interes_anual: [null, Validators.required],
      comision_concepto: [''],
      comision_tasa: [''],
      periodo_id: ['', Validators.required],
      periodo_gracia: [null, Validators.required],
      objeto_operacion_credito: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      cargo: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      firma_digital: [0],
      documento: [null, Validators.required],
      declaracion_jurada: ['', Validators.required]
    });

    this.solicitudForm.valueChanges.subscribe((changes) => {
      if (this.solicitudForm.valid) {
        console.log('El formulario es válido');
        this.formularioLlenada = true;
      } else {
        console.log('El formulario no es válido');
        this.formularioLlenada = false;
      }
    });
  };

  ngOnChanges(): void {
    if (this.selectedSolicitudForm !== undefined)
      this.getValueSolicitante();
  }

  ngOnInit(): void {
    //this.fechaActual = this.obtenerFechaActual();
    this.obtenerAcreedores();
    this.obtenerMonedas();
    this.obtenerPeriodos();

  }

  getValueSolicitante() {
    this._solicitudService.GetSolicitudById(this.token!, this.selectedSolicitudForm).subscribe({
      next: ({ data }: any) => {
        console.log(data[0]);

        this.solicitudForm.patchValue({
          entidad_id: data[0].entidad_id,
          identificador_id: data[0].identificador_id,
          acreedor_id: data[0].acreedor_id,
          monto_total: data[0].monto_total,
          moneda_id: data[0].moneda_id,
          plazo: data[0].plazo,
          interes_anual: data[0].interes_anual,
          comision_concepto: data[0].comision_concepto,
          comision_tasa: data[0].comision_tasa,
          periodo_id: data[0].periodo_id,
          periodo_gracia: data[0].periodo_gracia,
          objeto_operacion_credito: data[0].objeto_operacion_credito,
          nombre_completo: data[0].nombre_completo,
          cargo: data[0].cargo,
          correo_electronico: data[0].correo_electronico,
          telefono: data[0].telefono,
          firma_digital: data[0].firma_digital ? 1 : 0,
          documento: data[0].ruta_documento,
          declaracion_jurada: data[0].declaracion_jurada,
        });

        this.solicitudForm.disable();
        // entidades inputs
        this.numEntidad = data[0].entidad_id;
        this.nombreEntidad = data[0].denominacion;

        // firma digital msg
        if (data[0].firma_digital) {
          this.firmaValido = true;
        } else {
          this.firmaNoValido = true;
        }

        // hora creacion del formulario
        this.fechaActual = data[0].created_at;

      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal() {
    this.visibleForm1 = false;
    this.visibleForm1Change.emit(this.visibleForm1);
  }

  obtenerAcreedores() {
    this._acreedoresService.GetAllAcreedores(this.token!).subscribe(({ data }) => {
      this.acreedores = data.map((acreedor: any) => ({
        nombre: acreedor.nombre,
        id: acreedor.id
      }));
    });
  }

  obtenerMonedas() {
    this._monedasService.GetAllMonedas(this.token!).subscribe(({ data }) => {
      this.monedas = data.map((moneda: any) => ({
        nombre: `${moneda.tipo} (${moneda.sigla})`,
        id: moneda.id
      }));
    });
  }

  obtenerPeriodos() {
    this._periodoService.GetAllPeriodos(this.token!).subscribe(({ data }) => {
      this.periodos = data.map((periodo: any) => ({
        nombre: periodo.tipo,
        id: periodo.id
      }));
    });
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const dia = ('0' + hoy.getDate()).slice(-2);
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }


  openDocument() {
    this._abrirDocumentoService.GetDocumentoRiocp(this.token!, this.selectedSolicitudForm).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf';
        a.click();
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}

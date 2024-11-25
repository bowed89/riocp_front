import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcreedoresService } from 'src/app/shared/services/acreedores.service';
import { EntidadeService } from 'src/app/shared/services/entidades.service';
import { MonedasService } from 'src/app/shared/services/monedas.service';
import { PeriodoService } from 'src/app/shared/services/periodos.service';
import { FirmaDigitalService } from 'src/app/shared/services/firma-digital.service';
import { SolicitudService } from '../../services/solicitud.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';
import { SeguimientoOperadorService } from 'src/app/modules/operador/tramites/services/seguimiento-operador.service';

@Component({
  selector: 'app-formulario-uno',
  templateUrl: './formulario-uno.component.html',
  styleUrls: ['./formulario-uno.component.scss']
})
export class FormularioUnoComponent {
  inputWidth = 100; // Ancho inicial del input en píxeles

  solicitudForm!: FormGroup;
  token = localStorage.getItem('token');
  // Datoe Entidad
  idEntidad: number = 0;

  acreedores: any[] = [{ name: '', code: '' }];
  monedas: any[] = [];
  periodos: any[] = [];
  formularioLlenada: boolean = false;
  spinnerFirma: boolean = false;
  firmaValido: boolean = false;
  firmaNoValido: boolean = false;
  firmaNombre = '';
  firmaInicioValidez = '';
  firmaFinValidez = '';
  firmaMensajeError = '';

  constructor(
    private fb: FormBuilder,
    public _entidadeService: EntidadeService,
    public _acreedoresService: AcreedoresService,
    public _monedasService: MonedasService,
    public _periodoService: PeriodoService,
    public _firmaDigitalService: FirmaDigitalService,
    public _solicitudService: SolicitudService,
    public _messagesService: MessagesService,
    public _tramitesService: TramitesService,
    public _seguimientoOperadorService: SeguimientoOperadorService,

  ) {
    this.solicitudForm = this.fb.group({
      entidad_id: ['', Validators.required],
      identificador_id: ['', Validators.required],
      acreedor_id: ['', Validators.required],
      monto_total: [null, Validators.required],
      moneda_id: ['', Validators.required],
      plazo: [null, Validators.required],
      interes_anual: [null, Validators.required],
      comision_concepto: [null],
      comision_tasa: [null],
      periodo_id: ['', Validators.required],
      periodo_gracia: [null, Validators.required],
      objeto_operacion_credito: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      cargo: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      firma_digital: [0],
      documento: [null, Validators.required],
      declaracion_jurada: ['', Validators.required],
      // variables para enviar a pdf
      fecha_actual: [null],
      entidad: [null],
      nombre_entidad: [null],
      nombre_acreedor: [null],
      moneda_origen: [null],
      nombre_periodo: [null],

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
  }

  ngOnInit(): void {
    this.obtenerFechaActual();
    this.getEntidadesByUserRol();
    this.obtenerAcreedores();
    this.obtenerMonedas();
    this.obtenerPeriodos();
  }

  adjustWidth(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.textContent = inputElement.value || inputElement.placeholder;

    // Aplicar los mismos estilos de fuente para calcular el ancho correcto
    const inputStyle = window.getComputedStyle(inputElement);
    tempSpan.style.font = inputStyle.font;
    tempSpan.style.padding = inputStyle.padding;

    document.body.appendChild(tempSpan);

    // Ajustar el ancho del input al ancho del span temporal
    this.inputWidth = tempSpan.offsetWidth + 20; // +20 para margen adicional

    // Eliminar el span temporal
    document.body.removeChild(tempSpan);
  }

  generarPdf() {
    this._seguimientoOperadorService.generatePDF(this.token!, this.solicitudForm.value).subscribe(
      (pdfBlob: Blob) => {
        // Crear un enlace temporal para descargar el archivo PDF
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'formulario1.pdf'; // Nombre del archivo que se descargará
        link.click();

        // Liberar el objeto URL para evitar fugas de memoria
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al generar el PDF', error);
      }
    );

  }


  onSubmit() {
    if (this.solicitudForm.valid) {
      const formData = new FormData();

      Object.keys(this.solicitudForm.controls).forEach(key => {
        if (key === 'documento') {
          const file = this.solicitudForm.get(key)?.value;
          if (file instanceof File) {
            formData.append(key, file, file.name);
          } else {
            console.error('No se seleccionó un archivo.');
          }
        } else {
          formData.append(key, this.solicitudForm.get(key)?.value);
        }
      });

      formData.forEach((value, key) => {
        console.log(` resultado ====> ${key}:`, value);
      });
      
      this._solicitudService.PostSolicitudRiocp(formData, this.token!)
        .subscribe({
          next: ({ message }) => {
            this._messagesService.MessageSuccess('Formulario Agregado', message!);

          }, error: (error) => {
            this._messagesService.MessageError('Error al Agregar', error.error.message);
          }
        });
    }
  }


  getEntidadesByUserRol() {
    this._entidadeService.GetEntidadByUserRol(this.token!).subscribe(({ data }) => {
      this.idEntidad = data[0].entidad_id;
      this.solicitudForm.patchValue({ entidad: data[0].entidad, nombre_entidad: (data[0].denominacion).toUpperCase() });

    });
  }

  obtenerAcreedores() {
    this._acreedoresService.GetAllAcreedores(this.token!).subscribe(({ data }) => {
      this.acreedores = data.map((acreedor: any) => ({
        nombre: acreedor.nombre,
        id: acreedor.id
      }));
    });
  }

  nombreAcreedor(e: any) {
    const name = this.acreedores.find(acreedor => e.value === acreedor.id).nombre;
    this.solicitudForm.patchValue({ nombre_acreedor: name });
  }

  monedaOrigen(e: any) {
    const name = this.monedas.find(moneda => e.value === moneda.id).nombre;
    this.solicitudForm.patchValue({ moneda_origen: name });
  }

  periodoPago(e: any) {
    const name = this.periodos.find(periodo => e.value === periodo.id).nombre;
    this.solicitudForm.patchValue({ nombre_periodo: name });
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

  obtenerFechaActual() {
    const hoy = new Date();
    const dia = ('0' + hoy.getDate()).slice(-2);
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const anio = hoy.getFullYear();
    this.solicitudForm.patchValue({ fecha_actual: `${dia}/${mes}/${anio}` });

  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const maxSize = 11000000; // 11MB max
      if (file.type !== 'application/pdf') {
        this.solicitudForm.get('documento')?.setErrors({ invalidFileType: true });
      } else if (file.size > maxSize) {
        this.solicitudForm.get('documento')?.setErrors({ maxSizeExceeded: true });
      } else {
        // Convertir pdf a base64 y validar firma digital
        this.spinnerFirma = true;

        this._firmaDigitalService.ValidateDigitalSign(file, this.token!).subscribe(data => {
          console.log("firma digital ===>", data);
          this.spinnerFirma = true;
          this.onFileRemove();

          if (data.length > 0) {
            // valido cadenaConfianza,noModificado,firmadoAntesRevocacion,firmadoDuranteVigencia sean true
            if (data[0].cadenaConfianza &&
              data[0].noModificado &&
              data[0].firmadoAntesRevocacion &&
              data[0].firmadoDuranteVigencia) {

              this.firmaValido = true;
              this.firmaNombre = data[0].certificado.nombreSignatario;
              this.firmaInicioValidez = data[0].certificado.inicioValidez;
              this.firmaFinValidez = data[0].certificado.finValidez;

              this.solicitudForm.patchValue({ firma_digital: 1, entidad_id: this.idEntidad });
              this.solicitudForm.get('documento')?.setErrors(null); // Resetea errores si es válido
              this.solicitudForm.get('documento')?.setValue(file); // Guardar el archivo en el control

            } else {
              this.firmaMensajeError = 'LA VALIDEZ DE LA FIRMA DIGITAL VENCIO O TIENE PROBLEMAS';
              this.solicitudForm.patchValue({ firma_digital: 0 });
            }

          } else {
            this.firmaNoValido = true;
            this.firmaMensajeError = 'EL DOCUMENTO NO CUENTA CON FIRMA DIGITAL';
            this.solicitudForm.patchValue({ firma_digital: 0 });

          }
          this.spinnerFirma = false;
        });

      }
    }
  }

  onFileRemove() {
    this.solicitudForm.get('documento')?.setValue('');
    this.firmaValido = false;
    this.firmaNoValido = false;
    this.firmaNombre = ''
    this.firmaInicioValidez = ''
    this.firmaFinValidez = ''
  }

}

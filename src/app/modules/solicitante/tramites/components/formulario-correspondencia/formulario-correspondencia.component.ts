import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TramitesService } from '../../services/tramites.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { EntidadeService } from 'src/app/shared/services/entidades.service';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { FirmaDigitalService } from 'src/app/shared/services/firma-digital.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-correspondencia',
  templateUrl: './formulario-correspondencia.component.html',
  styleUrls: ['./formulario-correspondencia.component.scss']
})
export class FormularioCorrespondenciaComponent {
  registroForm!: FormGroup;
  isValidForm: boolean = false; // Flag para la validez del formulario

  firmaDigital = false;
  spinnerFirma: boolean = false;
  firmaValido: boolean = false;
  firmaNoValido: boolean = false;
  firmaNombre = '';
  firmaInicioValidez = '';
  firmaFinValidez = '';
  firmaMensajeError = '';

  uploadedFiles: any[] = [];
  ingredient: string = '';
  token = localStorage.getItem('token');


  constructor(
    private fb: FormBuilder,
    public _messagesService: MessagesService,
    public _entidadeService: EntidadeService,
    public _correspondenciaService: CorrespondenciaService,
    public _firmaDigitalService: FirmaDigitalService,
    public _tramitesService: TramitesService,

    private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      nombre_entidad: ['', Validators.required],
      cite_documento: ['', Validators.required],
      referencia: ['', Validators.required],
      documento: [null, Validators.required],
      firma_digital: [0, Validators.required],
    });

    /* 
        this._entidadeService.GetEntidadByUserRol(this.token!).subscribe(({ data }) => {
          this.registroForm.patchValue({
            nombre_completo: `${data[0].nombre} ${data[0].apellido}`,
            correo_electronico: data[0].correo,
            nombre_entidad: data[0].denominacion
          });
          // dshabilitar inputs llenados
          this.registroForm.get('nombre_completo')?.disable();
          this.registroForm.get('correo_electronico')?.disable();
          this.registroForm.get('nombre_entidad')?.disable();
    
        });
     */

  }



  onSubmit(): void {
    // Asigna el número de solicitud y estado_solicitud_id al formulario
    if (this.registroForm.valid) {
      const formData = new FormData();
      formData.append('nombre_completo', this.registroForm.get('nombre_completo')?.value);
      formData.append('correo_electronico', this.registroForm.get('correo_electronico')?.value);
      formData.append('nombre_entidad', this.registroForm.get('nombre_entidad')?.value);
      formData.append('cite_documento', this.registroForm.get('cite_documento')?.value);
      formData.append('referencia', this.registroForm.get('referencia')?.value);
      formData.append('documento', this.registroForm.get('documento')?.value);
      formData.append('firma_digital', this.registroForm.get('firma_digital')?.value);
      // Muestra el contenido del FormData en la consola
      for (let [key, value] of formData as any) {
        console.log(`${key}: ${value}`);
      }
      const token = localStorage.getItem('token');

      this.Registrar(formData, token)



    } else {
      this.registroForm.markAllAsTouched();
    }

  }

  onFileSelect(event: any) {
    const file = event.files[0];

    if (file) {
      const maxSize = 11000000; // 11MB max
      if (file.type !== 'application/pdf') {
        this.registroForm.get('documento')?.setErrors({ invalidFileType: true });
      } else if (file.size > maxSize) {
        this.registroForm.get('documento')?.setErrors({ maxSizeExceeded: true });
      } else {
        this.registroForm.get('documento')?.setErrors(null); // Resetea errores si es válido
        this.registroForm.get('documento')?.setValue(file); // Guardar el archivo en el control
      }
    }
  }

  onFileSelectDigital(event: any) {
    const file = event.files[0];
    if (file) {
      const maxSize = 11000000; // 11MB max
      if (file.type !== 'application/pdf') {
        this.registroForm.get('documento')?.setErrors({ invalidFileType: true });
      } else if (file.size > maxSize) {
        this.registroForm.get('documento')?.setErrors({ maxSizeExceeded: true });
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

              this.registroForm.patchValue({ firma_digital: 1 });
              this.registroForm.get('documento')?.setErrors(null); // Resetea errores si es válido
              this.registroForm.get('documento')?.setValue(file); // Guardar el archivo en el control

            } else {
              this.firmaMensajeError = 'LA VALIDEZ DE LA FIRMA DIGITAL VENCIO O TIENE PROBLEMAS';
            }

          } else {
            this.firmaNoValido = true;
            this.firmaMensajeError = 'EL DOCUMENTO NO CUENTA CON FIRMA DIGITAL';
            this.registroForm.patchValue({ firma_digital: 0 });
          }
          this.spinnerFirma = false;
        });
      }
    }
  }

  onFileUpload(event: any) {
    console.log('Archivo subido:', event.files);
  }

  onFileRemove() {
    this.registroForm.get('documento')?.setValue('');
    this.firmaValido = false;
    this.firmaNoValido = false;
    this.firmaNombre = ''
    this.firmaInicioValidez = ''
    this.firmaFinValidez = ''
  }

  esFirmaDigital(e: any) {
    this.onFileRemove();

    if (e.value === "1") {
      this.firmaDigital = true;
    } else {
      this.firmaDigital = false;
    }

  }



  Registrar(formData: any, token: any) {

    console.log('sakasakskasaskk');

    this.confirmationService.confirm({
      message: '¿Esta seguro de registrar su nota de correspondencia? No podrá registrar ningún otro formulario ni anexar archivos.',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        console.log('Confirmado');

        // Imprimir todo el contenido
        for (let key of formData.keys()) {
          console.log(key, formData.getAll(key));
        }



        this._correspondenciaService.PostSolicitudCorrespondencia(formData, token!)
          .subscribe({
            next: ({ message }) => {
              this._messagesService.MessageSuccess('Formulario Agregado', message!);
            },
            error: (error) => {
              console.log("error", error);
              this._messagesService.MessageError('Error al Agregar', error.error.message);
            },
          });

      },
      reject: (type: any) => {
        console.log('noooo');

        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Formulario Cancelado' });
            break;
        }
      }
    });

  }


}

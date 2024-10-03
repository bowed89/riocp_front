import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TramitesService } from '../../services/tramites.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { EntidadeService } from 'src/app/shared/services/entidades.service';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-formulario-correspondencia',
  templateUrl: './formulario-correspondencia.component.html',
  styleUrls: ['./formulario-correspondencia.component.scss']
})
export class FormularioCorrespondenciaComponent {
  registroForm!: FormGroup;
  isValidForm: boolean = false; // Flag para la validez del formulario

  uploadedFiles: any[] = [];
  ingredient: string = '';
  token = localStorage.getItem('token');


  constructor(
    private fb: FormBuilder,
    public _tramitesService: TramitesService,
    public _messagesService: MessagesService,
    public _entidadeService: EntidadeService,
    public _correspondenciaService: CorrespondenciaService,
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nro_solicitud: [null],
      estado_solicitud_id: [null],
      nombre_completo: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      nombre_entidad: ['', Validators.required],
      cite_documento: ['', Validators.required],
      referencia: ['', Validators.required],
      documento: [null, Validators.required],
      firma_digital: [null, Validators.required],
      solicitud_id: [0]
    });

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
    
  }

  onSubmit(): void {
    console.log('submit');

    this.generateNroRegistro().then(nroRegistro => {
      console.log('generateNroRegistro', nroRegistro);
      // Asigna el número de solicitud y estado_solicitud_id al formulario
      this.registroForm.patchValue({
        nro_solicitud: nroRegistro,
        estado_solicitud_id: 1
      });

      if (this.registroForm.valid) {
        const formData = new FormData();
        formData.append('nro_solicitud', this.registroForm.get('nro_solicitud')?.value);
        formData.append('estado_solicitud_id', this.registroForm.get('estado_solicitud_id')?.value);
        formData.append('nombre_completo', this.registroForm.get('nombre_completo')?.value);
        formData.append('correo_electronico', this.registroForm.get('correo_electronico')?.value);
        formData.append('nombre_entidad', this.registroForm.get('nombre_entidad')?.value);
        formData.append('cite_documento', this.registroForm.get('cite_documento')?.value);
        formData.append('referencia', this.registroForm.get('referencia')?.value);
        formData.append('documento', this.registroForm.get('documento')?.value);
        formData.append('firma_digital', this.registroForm.get('firma_digital')?.value);
        formData.append('solicitud_id', this.registroForm.get('solicitud_id')?.value);

        const token = localStorage.getItem('token');
        this._correspondenciaService.PostSolicitudCorrespondencia(formData, token!).subscribe(({ message }) => {
          this._messagesService.MessageSuccess('Tramite Registrado', message!);

          // habilito la pestaña para Formulario 1
          this._tramitesService.SetFormValid(true, 'formulario-1');

        }, (err) => {
          this._messagesService.MessageError('Error', err);
        });

      } else {
        this.registroForm.markAllAsTouched();
      }
    }).catch(error => {
      this._messagesService.MessageError('Error', error);
    });
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
  onFileUpload(event: any) {
    console.log('Archivo subido:', event.files);
  }

  onFileRemove() {
    this.registroForm.get('documento')?.setValue('');
    // Aquí puedes agregar más lógica si es necesario.
    // Por ejemplo, restablecer el estado del formulario o limpiar campos.
  }

  generateNroRegistro(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      // Fecha actual
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const año = fecha.getFullYear();
      const fullDate = `${dia}${mes}${año}`;
      // num random
      const numRandom = Math.floor(Math.random() * 100) + 1;
      // cod entidad
      this._entidadeService.GetEntidadByUserRol(this.token!).subscribe(({ data }) => {
        const num_entidad = data[0].num_entidad;
        const nroRegistro = `${fullDate}${num_entidad}${numRandom}`;
        resolve(nroRegistro);
      }, error => {
        console.error('Error obteniendo num_entidad:', error);
        reject(error);
      });

    });
  }




}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnexosService } from '../../services/anexos.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './anexo-uno.component.html',
  styleUrls: ['./anexo-uno.component.scss']
})
export class AnexoUnoComponent implements OnInit {
  documentosForm: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    public _anexosService: AnexosService,
    public _tipoDocumentoService: TipoDocumentoService,
    public _messagesService: MessagesService,
    private fb: FormBuilder,
    public _tramitesService: TramitesService,

  ) {
    this.documentosForm = this.fb.group({
      tipo_documento_id_cronograma: [1, Validators.required],
      documento_cronograma: [null, Validators.required],
      tipo_documento_id_desembolso: [2, Validators.required],
      documento_desembolso: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onFileSelectCronograma(event: any) {
    const file = event.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      this.documentosForm.patchValue({ documento_cronograma: file }); // Actualiza el campo del documento
    }
  }

  onFileSelectDesembolso(event: any) {
    const file = event.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      this.documentosForm.patchValue({ documento_desembolso: file }); // Actualiza el campo del documento
    }
  }

  onSubmit() {
    if (this.documentosForm.valid) {
      const formData = new FormData();
      const documento = this.documentosForm.value;

      // Añadir archivos al FormData
      if (documento.documento_cronograma) {
        formData.append('documento_cronograma', documento.documento_cronograma);
      }

      if (documento.documento_desembolso) {
        formData.append('documento_desembolso', documento.documento_desembolso);
      }

      formData.append('tipo_documento_id_cronograma', documento.tipo_documento_id_cronograma.toString());
      formData.append('tipo_documento_id_desembolso', documento.tipo_documento_id_desembolso.toString());

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this._anexosService.PostAnexos1(formData, this.token!).subscribe({
        next: ({ message }) => {
          this._messagesService.MessageSuccess('Formulario Agregado', message!);
        },
        error: (error) => {
          this._messagesService.MessageError('Error al Agregar', error.error.message);
        }
      });

    } else {
      console.error('El formulario no es válido');
    }
  }

  onFileRemove(msg: string) {
    if (msg === 'cronograma') {
      this.documentosForm.get('documento_cronograma')?.setValue(null);
    }

    if (msg === 'desembolso') {
      this.documentosForm.get('documento_desembolso')?.setValue(null);
    }

  }
}

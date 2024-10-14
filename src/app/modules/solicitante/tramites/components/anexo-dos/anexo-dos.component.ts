import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnexosService } from '../../services/anexos.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './anexo-dos.component.html',
  styleUrls: ['./anexo-dos.component.scss']
})
export class AnexoDosComponent implements OnInit {
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
      tipo_documento_id: [2, Validators.required],
      documento: [null, Validators.required] // Campo para el archivo
    });
  }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    const file = event.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      this.documentosForm.patchValue({ documento: file }); // Actualiza el campo del documento
    }
  }

  onSubmit() {
    if (this.documentosForm.valid) {
      const formData = new FormData();
      const documento = this.documentosForm.value;

      this.documentosForm.patchValue({ tipo_documento_id: 2 }); // id 2 desembolsos

      if (documento.documento instanceof File) {
        formData.append('documento', documento.documento);
        formData.append('tipo_documento_id', documento.tipo_documento_id);
      }

      // Imprimir el contenido del FormData
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this._anexosService.PostAnexos2(formData, this.token!).subscribe({
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


  /*   obtenerTipoDocumentos() {
      this._tipoDocumentoService.GetAllTipoDocumentos(this.token!).subscribe(({ data }) => {
        this.tipos = data.map((tipo: any) => ({
          nombre: tipo.tipo,
          id: tipo.id
        }));
      });
    } */

  onFileRemove() {
    console.log('remove');

    this.documentosForm.get('documento')?.setValue(null);
  }
}

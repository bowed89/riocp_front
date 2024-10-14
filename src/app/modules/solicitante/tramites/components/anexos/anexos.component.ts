import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnexosService } from '../../services/anexos.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent implements OnInit {
  documentosForm: FormGroup;
  tipos: any[] = [{ name: '', code: '' }];
  tipoDocumentos: any[] = []; // Aquí se guardan las opciones del dropdown
  token = localStorage.getItem('token');

  constructor(
    public _anexosService: AnexosService,
    public _tipoDocumentoService: TipoDocumentoService,
    public _messagesService: MessagesService,
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario
    this.documentosForm = this.fb.group({
      documentos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.obtenerTipoDocumentos();

    // Simula la carga de tipos de documentos
    this.tipoDocumentos = [
      { label: 'Selecciona un documento', value: null },
      { label: 'Documento Tipo 1', value: 1 },
      { label: 'Documento Tipo 2', value: 2 },
      { label: 'Documento Tipo 3', value: 3 }
      // Aquí puedes agregar más tipos de documentos
    ];
    this.addDocument(); // Agrega un documento por defecto
  }

  // Método para acceder al FormArray
  get documentos(): FormArray {
    return this.documentosForm.get('documentos') as FormArray;
  }

  // Método para agregar un nuevo documento al FormArray
  addDocument() {
    const documentosArray = this.documentos; // Ahora usa el getter
    documentosArray.push(this.fb.group({
      tipo_documento_id: [null, Validators.required],
      documento: [null, Validators.required] // Campo para el archivo
    }));
  }

  onFileSelect(event: any, index: number) {
    const file = event.files[0]; // Obtiene el primer archivo seleccionado

    console.log("file===>=", file, index);


    const documentosArray = this.documentos; // Usa el getter para el FormArray

    if (file) {
      const documentos = this.documentosForm.get('documentos')?.value;
      documentosArray.at(index).patchValue({ documento: file }); // Usamos patchValue para actualizar el archivo

      // documentosArray.at(index).get('documento')?.setValue(file) // Actualiza el FormControl correspondiente
    }
  }

  onSubmit() {
    if (this.documentosForm.valid) {
      const documentos = this.documentosForm.get('documentos')?.value;
      const formData = new FormData();


      console.log("documentos ==> ", documentos);


      // Iterar sobre los documentos para añadir al FormData en formato correcto
      documentos.forEach((doc: any, index: number) => {
        if (doc.documento instanceof File) {
          formData.append(`documentos[${index}][documento]`, doc.documento); // Añade el archivo al FormData
        } else {
          console.error(`El documento en el índice ${index} no es un archivo válido`);
        }
        formData.append(`documentos[${index}][tipo_documento_id]`, doc.tipo_documento_id);
      });

      this._anexosService.PostAnexos1(formData, this.token!).subscribe({
        next: ({ message }) => {
          this._messagesService.MessageSuccess('Formulario Agregado', message!);
        },

        error: (error) => {
          this._messagesService.MessageError('Error al Agregar', error.error.message);
        },
        complete: () => {
          /*  setTimeout(() => {
             this._tramitesService.SetFormValid(true, 'formulario-4', this.deudaForm.value);
             console.log('El proceso ha finalizado completamente.');
           }, 2000); */
        }
      });

    } else {
      console.error('El formulario no es válido');
    }
  }


  obtenerTipoDocumentos() {
    this._tipoDocumentoService.GetAllTipoDocumentos(this.token!).subscribe(({ data }) => {
      this.tipos = data.map((tipo: any) => ({
        nombre: tipo.tipo,
        id: tipo.id
      }));
    });
  }


}

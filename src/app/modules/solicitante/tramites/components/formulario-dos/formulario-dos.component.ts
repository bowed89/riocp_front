import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';
import { InformacionDeudaService } from '../../services/informacion-deuda.service';
import { AnexosService } from '../../services/anexos.service';


@Component({
  selector: 'app-formulario-dos',
  templateUrl: './formulario-dos.component.html',
  styleUrls: ['./formulario-dos.component.scss']
})
export class FormularioDosComponent {
  deudaForm!: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    public _messagesService: MessagesService,
    public _informacionDeudaService: InformacionDeudaService,
    public _tramitesService: TramitesService,
    public _anexosService: AnexosService,

  ) { }

  ngOnInit(): void {
    this.deudaForm = this.fb.group({
      pregunta_1: [null, Validators.required],
      pregunta_2: [null, Validators.required],
      pregunta_3: [null, Validators.required],
      pregunta_4: [null, Validators.required],
      documento: [null],
      solicitud_id: [0],
    });
  }

  changePregunta4() {
    const pregunta4Value = this.deudaForm.get('pregunta_4')?.value;
    const documentoControl = this.deudaForm.get('documento');

    console.log('Pregunta 4 Value:', pregunta4Value);

    if (pregunta4Value === 1) {
      documentoControl?.setValidators([Validators.required]);
    } else {
      documentoControl?.clearValidators();
      this.onFileRemove();
    }

    documentoControl?.updateValueAndValidity();
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.deudaForm.patchValue({ documento: file });
    }
  }

  onFileRemove() {
    this.deudaForm.get('documento')?.setValue(null);
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      if (this.deudaForm.get('pregunta_4')?.value) {
        // si es true pregunta_4 entonces llamo a servicio de documento_adjunto_2
        const formData = new FormData();
        const documento = this.deudaForm.value;
        if (documento.documento) {
          formData.append('documento', documento.documento);
          formData.append('tipo_documento_id', (4).toString());
        }

        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        this._anexosService.PostAnexos2(formData, this.token!).subscribe({
          next: () => {
            this.PostInformationDeuda(this.deudaForm.value, this.token!);
          },
          error: ({ error }) => {
            this._messagesService.MessageError('Error', error.message);
          }
        })

      } else {
        this.PostInformationDeuda(this.deudaForm.value, this.token!);
      }

      return



      this._informacionDeudaService.PostInformacionDeuda(this.deudaForm.value, this.token!)
        .subscribe({
          next: ({ message }) => {
            this._messagesService.MessageSuccess('Formulario Agregado', message!);
          },

          error: (error) => {
            console.log("error", error);
            this._messagesService.MessageError('Error al Agregar', error.error.message);
          }
        });
    }
  }

  PostInformationDeuda(body: any, token: any) {
    this._informacionDeudaService.PostInformacionDeuda(body, token!)
      .subscribe({
        next: ({ message }) => {
          this._messagesService.MessageSuccess('Formulario Agregado', message!);
        },

        error: (error) => {
          console.log("error", error);
          this._messagesService.MessageError('Error al Agregar', error.error.message);
        }
      });
  }

}

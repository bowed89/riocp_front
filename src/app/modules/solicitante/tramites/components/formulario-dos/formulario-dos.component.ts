import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';
import { InformacionDeudaService } from '../../services/informacion-deuda.service';


@Component({
  selector: 'app-formulario-dos',
  templateUrl: './formulario-dos.component.html',
  styleUrls: ['./formulario-dos.component.scss']
})
export class FormularioDosComponent {
  deudaForm!: FormGroup;
  token = localStorage.getItem('token');
  preguntas = {
    pregunta_1: false,
    pregunta_2: false,
    pregunta_3: false,
  }


  constructor(
    private fb: FormBuilder,
    public _messagesService: MessagesService,
    public _tramitesService: TramitesService,
    public _informacionDeudaService: InformacionDeudaService,

  ) { }

  ngOnInit(): void {
    this.deudaForm = this.fb.group({
      pregunta_1: [null, Validators.required],
      pregunta_2: [null, Validators.required],
      pregunta_3: [null, Validators.required],
      pregunta_4: [null, Validators.required],
      solicitud_id: [0],
    });
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      this._informacionDeudaService.PostInformacionDeuda(this.deudaForm.value, this.token!)
        .subscribe({
          next: ({ message }) => {
            this._messagesService.MessageSuccess('Formulario Agregado', message!);
          },

          error: (error) => {
            console.log("error", error);

            this._messagesService.MessageError('Error al Agregar', error.error.message);
          },
          complete: () => {
            setTimeout(() => {
              this._tramitesService.SetFormValid(true, 'formulario-3', this.deudaForm.value);
              console.log('El proceso ha finalizado completamente.');
            }, 2000); // 1 segundo de retraso
          }
        });
    }
  }
  
}

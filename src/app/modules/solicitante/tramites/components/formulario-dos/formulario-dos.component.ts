import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-formulario-dos',
  templateUrl: './formulario-dos.component.html',
  styleUrls: ['./formulario-dos.component.scss']
})
export class FormularioDosComponent {
  deudaForm!: FormGroup;

  pregunta1: any;
  pregunta2: any;
  pregunta3: any;
  pregunta4: any;

  constructor(
    private fb: FormBuilder,
    public _messagesService: MessagesService,
    public _tramitesService: TramitesService

  ) { }

  ngOnInit(): void {
    this.deudaForm = this.fb.group({
      pregunta1: [null, Validators.required],
      pregunta2: [null, Validators.required],
      pregunta3: [null, Validators.required],
      pregunta4: [null, Validators.required],
    });

    this.deudaForm.valueChanges.subscribe(() => {
      // this._tramitesService.setFormValid(this.deudaForm.valid);

    });
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      const formData = this.deudaForm.value;
      console.log('Formulario válido, datos:', formData);

    } else {
      console.log('Formulario no válido');
    }
  }

  eventRadioBtn(pregunta: string) {
    if (pregunta === 'pregunta1') {
      this._tramitesService.SetFormValid(this.deudaForm.value.pregunta1, 'formulario-2-pregunta-1');
    } 
    else if (pregunta === 'pregunta2') {
      this._tramitesService.SetFormValid(this.deudaForm.value.pregunta2, 'formulario-2-pregunta-2');
    }
    else if (pregunta === 'pregunta3') {
      this._tramitesService.SetFormValid(this.deudaForm.value.pregunta3, 'formulario-2-pregunta-3');
    }
  }


}

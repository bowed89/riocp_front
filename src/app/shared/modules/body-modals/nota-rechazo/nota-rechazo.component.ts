import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nota-rechazo',
  templateUrl: './nota-rechazo.component.html',
  styleUrls: ['./nota-rechazo.component.scss']
})
export class NotaRechazoComponent {
  certificadoForm!: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
    this.certificadoForm = this.fb.group({
      fecha: ['', Validators.required],
      codigo: ['', Validators.required],
      destinatario: ['', Validators.required],
      referencia: ['', Validators.required],
      cuerpo: ['', Validators.required],
      firma: ['', Validators.required],
      codigoInferior: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.certificadoForm.valid) {
      console.log('Formulario enviado:', this.certificadoForm.value);
      // Aquí puedes enviar los datos al backend o procesarlos como desees
    } else {
      console.log('Formulario inválido');
    }
  }

}

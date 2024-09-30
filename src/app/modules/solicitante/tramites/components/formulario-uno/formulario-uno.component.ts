import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-uno',
  templateUrl: './formulario-uno.component.html',
  styleUrls: ['./formulario-uno.component.scss']
})
export class FormularioUnoComponent {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      fecha: ['', Validators.required],
      entidadSolicitante: ['', Validators.required],
      otraInfo: ['', Validators.required],
      creditoInterno: [false],
      creditoExterno: [false],
      acreedor: ['', Validators.required],
      caracteristica1: ['', Validators.required],
      caracteristica2: ['', Validators.required],
      objeto: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      cargo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}

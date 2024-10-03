import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-uno',
  templateUrl: './formulario-uno.component.html',
  styleUrls: ['./formulario-uno.component.scss']
})
export class FormularioUnoComponent {
  solicitudForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el FormGroup con validadores
    this.solicitudForm = this.fb.group({
      fecha: ['', Validators.required],
      codigoEntidad: ['', Validators.required],
      otraInformacion: [''],
      acreedor: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      monedaOrigen: ['', Validators.required],
      plazo: ['', [Validators.required, Validators.min(1)]],
      tasaInteres: ['', [Validators.required, Validators.min(0)]],
      comisiones: ['', [Validators.required, Validators.min(0)]],
      periodicidadPago: ['', Validators.required],
      periodoGracia: ['', [Validators.required, Validators.min(0)]],
      objetoOperacion: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      cargo: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // solo números
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      console.log('Formulario enviado:', this.solicitudForm.value);
    } else {
      this.solicitudForm.markAllAsTouched();
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-formulario-correspondencia',
  templateUrl: './formulario-correspondencia.component.html',
  styleUrls: ['./formulario-correspondencia.component.scss']
})
export class FormularioCorrespondenciaComponent {
  registroForm!: FormGroup;
  isValidForm: boolean = false; // Flag para la validez del formulario

  constructor(
    private fb: FormBuilder,
    public _tramitesService: TramitesService
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      nombreEntidad: ['', Validators.required],
      cite: ['', Validators.required],
      referencia: ['', Validators.required],
      documento: [null, Validators.required],
    });

    // verifica automatico que el formulario se complete y dispara un true cuando se completa
    this.registroForm.valueChanges.subscribe(() => {
      this._tramitesService.FormRegistroValid = this.registroForm.valid;
      console.log('flaggg', this._tramitesService.FormRegistroValid);

    });
  }

  onSubmit(): void {
    console.log('submit');
    console.log('Formulario enviado:', this.registroForm.value);

    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
    } else {
      this.registroForm.markAllAsTouched();
    }
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

  onFileUploadError(event: any) {
    console.error('Error al subir el archivo:', event);
  }
}

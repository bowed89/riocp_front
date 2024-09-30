import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TramitesService } from '../../services/tramites.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-formulario-correspondencia',
  templateUrl: './formulario-correspondencia.component.html',
  styleUrls: ['./formulario-correspondencia.component.scss']
})
export class FormularioCorrespondenciaComponent {
  registroForm!: FormGroup;
  isValidForm: boolean = false; // Flag para la validez del formulario

  uploadedFiles: any[] = [];
  ingredient: string = '';


  constructor(
    private fb: FormBuilder,
    public _tramitesService: TramitesService,
    public _messagesService: MessagesService
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

      console.log('this.registroForm.valid', this.registroForm.valid);
      
      this._tramitesService.SetFormValid(this.registroForm.valid, 'formulario-1');
    });

  }


  onSubmit(): void {
    console.log('submit');
    console.log('Formulario enviado:', this.registroForm.value);

    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      this._messagesService.MessageSuccess('Tramite Registrado', 'Se registro su trámite correctamente.');
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

  onFileRemove() {
    console.log("El archivo ha sido cancelado.");
    // Aquí puedes agregar más lógica si es necesario.
    // Por ejemplo, restablecer el estado del formulario o limpiar campos.
  }
}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
  selector: 'app-nota-rechazo',
  templateUrl: './nota-rechazo.component.html',
  styleUrls: ['./nota-rechazo.component.scss']
})
export class NotaRechazoComponent {
  @Input() idSolicitud: any;

  certificadoForm!: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    private _notaCertificadoRiocpService: NotaCertificadoRiocpService
  ) {
    this.certificadoForm = this.fb.group({
      body: ['', Validators.required],
      fecha: ['', Validators.required],
      codigo: ['', Validators.required],
      destinatario: ['', Validators.required],
      referencia: ['', Validators.required],
      footer: ['', Validators.required],
      codigoInferior: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerDatosNota();
    console.log("idSolicitud =>" + this.idSolicitud);

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

  obtenerDatosNota() {
    this._notaCertificadoRiocpService.GetDatosNotaCertificado(this.token!, this.idSolicitud)
      .subscribe({
        next: (value) => {
          console.log(value.data);

        }, error(err) {
          console.error(err);

        },
      })
  }

}

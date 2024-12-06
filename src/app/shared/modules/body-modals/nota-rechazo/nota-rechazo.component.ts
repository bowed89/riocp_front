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
  @Input() tipoNotaRiocp: any;

  certificadoForm!: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    private _notaCertificadoRiocpService: NotaCertificadoRiocpService
  ) {
    this.certificadoForm = this.fb.group({
      fecha: ['', Validators.required],
      nro_nota: ['', Validators.required],
      header: ['', Validators.required],
      referencia: ['', Validators.required],
      body: ['', Validators.required],
      remitente: ['', Validators.required],
      revisado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerDatosNota();
    console.log("idSolicitud =>" + this.idSolicitud);
    console.log("tipoNotaRiocp =>" + this.tipoNotaRiocp);

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
    console.log(this.idSolicitud);

    this._notaCertificadoRiocpService.GetDatosNotaRechazoRiocp(this.token!, this.idSolicitud).subscribe({
      next: (value) => {
        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
        this.certificadoForm.patchValue({
          body, footer, header, referencia, fecha, nro_nota, remitente, revisado
        });

      }, error(err) {
        console.error(err);
      },
    })
  }

}

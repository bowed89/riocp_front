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

  // recibimos sd y vpd desde certificado riocp componente con internediario en derivar-modal
  @Input() sd: any;
  @Input() vpd: any;
  @Input() seguimientoForm!: FormGroup;

  //certificadoForm!: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    private _notaCertificadoRiocpService: NotaCertificadoRiocpService
  ) {
/*     this.certificadoForm = this.fb.group({
      fecha: ['', Validators.required],
      nro_nota: ['', Validators.required],
      header: ['', Validators.required],
      referencia: ['', Validators.required],
      body: ['', Validators.required],
      remitente: ['', Validators.required],
      revisado: ['', Validators.required],
    }); */
  }

  ngOnInit() {
    console.log("idSolicitud =>" + this.idSolicitud);
    console.log("tipoNotaRiocp =>" + this.tipoNotaRiocp);
    console.log("sd =>" + this.sd);
    console.log("vpd =>" + this.vpd);

    switch (this.tipoNotaRiocp) {
      case 'APROBACIÓN':
        this.obtenerDatosNotaAprobado();
        break;
      case 'OBSERVACIONES':
        this.obtenerDatosNotaObservacion();
        break;
      case 'RECHAZO':
        this.obtenerDatosNotaRechazo();
        break;
      default:
        // Lógica para casos no contemplados
        break;
    }

  }


  obtenerDatosNotaAprobado() {
    console.log(this.idSolicitud);

    this._notaCertificadoRiocpService.GetDatosNotaAprobadoRiocp(this.token!, this.idSolicitud).subscribe({
      next: (value) => {
        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
        this.seguimientoForm.patchValue({
          body, footer, header, referencia, fecha, nro_nota, remitente, revisado
        });

      }, error(err) {
        console.error(err);
      },
    })
  }

  obtenerDatosNotaObservacion() {
    console.log(this.idSolicitud);

    this._notaCertificadoRiocpService.GetDatosNotaObservacionRiocp(this.token!, this.idSolicitud).subscribe({
      next: (value) => {
        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
        this.seguimientoForm.patchValue({
          body, footer, header, referencia, fecha, nro_nota, remitente, revisado
        });

      }, error(err) {
        console.error(err);
      },
    })
  }

  obtenerDatosNotaRechazo() {
    console.log(this.idSolicitud);

    this._notaCertificadoRiocpService.GetDatosNotaRechazoRiocp(this.token!, this.idSolicitud, this.sd, this.vpd).subscribe({
      next: (value) => {
        const { body, footer, header, referencia, fecha, nro_nota, remitente, revisado }: any = value.data;
        this.seguimientoForm.patchValue({
          body, footer, header, referencia, fecha, nro_nota, remitente, revisado
        });

      }, error(err) {
        console.error(err);
      },
    })
  }

}

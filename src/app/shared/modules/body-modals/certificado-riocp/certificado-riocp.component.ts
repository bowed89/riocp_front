import { Component, Input } from '@angular/core';
import { CertificadoRiocpService } from 'src/app/shared/services/certificado-riocp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificado-riocp',
  templateUrl: './certificado-riocp.component.html',
  styleUrls: ['./certificado-riocp.component.scss']
})
export class CertificadoRiocpComponent {
  token = localStorage.getItem('token');
  @Input() idSolicitud: any;

  certificadoForm!: FormGroup;
  radio: any;
  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _certificadoRiocpService: CertificadoRiocpService,

  ) {
    this.certificadoForm = this.fb.group({
      identificador_id: [{ value: '', disabled: true }, Validators.required],
      nro_solicitud: [{ value: '', disabled: true }, Validators.required],
      codigo: [{ value: '', disabled: true }, Validators.required],
      entidad: [{ value: '', disabled: true }, Validators.required],
      objeto_operacion_credito: [''],
      acreedor: [{ value: '', disabled: true }],
      monto_total: [{ value: '', disabled: true }, Validators.required],
      moneda: [{ value: '', disabled: true }, Validators.required],
      interes_anual: [{ value: '', disabled: true }, Validators.required],
      comision: [{ value: '', disabled: true }, Validators.required],
      plazo: [{ value: '', disabled: true }, Validators.required],
      periodo_gracia: [{ value: '', disabled: true }, Validators.required],
      servicio_deuda: ['', Validators.required],
      valor_presente_deuda_total: ['', Validators.required],
      solicitud_id: [''],
    });
  }

  ngOnInit() {
    this.datosCertificado();
    console.log("idSolicitud =>" + this.idSolicitud);

  }

  onSubmit() {
    this.certificadoForm.patchValue({
      solicitud_id: this.idSolicitud,
    });

    console.log(this.certificadoForm.value);

    this._certificadoRiocpService.PostFormularioRegistro(this.certificadoForm.value, this.token!)
      .subscribe({
        next: (value) => {
          console.log(value);

        }, error: (err) => {
          console.error(err);

        },
      })

  }

  datosCertificado() {
    this._certificadoRiocpService.GetDatosCertificado(this.token!, this.idSolicitud).subscribe({
      next: ({ data }) => {
        console.log("riocp=>" + JSON.stringify(data[0]));
        this.certificadoForm.patchValue({
          identificador_id: data[0].identificador_id,
          solicitud_id: data[0].solicitud_id,
          nro_solicitud: data[0].nro_solicitud,
          codigo: data[0].codigo,
          entidad: data[0].entidad,
          objeto_operacion_credito: data[0].objeto_operacion_credito,
          acreedor: data[0].acreedor,
          monto_total: data[0].monto_total,
          moneda: data[0].moneda,
          interes_anual: data[0].interes_anual,
          comision: `${data[0].comision_concepto}\n${data[0].comision_tasa}`,
          plazo: data[0].plazo,
          periodo_gracia: data[0].periodo_gracia,
          servicio_deuda: `${data[0].servicio_deuda}`,
        });

      }, error(err) {
        console.error(err);

      },
    })

  }

  showDialog() {
    this.visible = true;
  }

}

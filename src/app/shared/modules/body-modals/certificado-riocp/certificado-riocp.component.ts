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
      nro_solicitud: ['', Validators.required],
      codigo: ['', Validators.required],
      entidad: ['', Validators.required],
      objeto_operacion_credito: [''],
      acreedor: [''],
      monto_total: ['', Validators.required],
      moneda: ['', Validators.required],
      interes_anual: ['', Validators.required],
      comision: ['', Validators.required],
      plazo: ['', Validators.required],
      periodo_gracia: [''],
      servicio_deuda: [''],
      valor_deuda_total: [''],
    });
  }

  ngOnInit() {
    this.datosCertificado();
    console.log("idSolicitud =>" + this.idSolicitud);

  }

  onSubmit() {

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

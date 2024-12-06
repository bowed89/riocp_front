import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() tipoNotaRiocp: EventEmitter<string> = new EventEmitter<string>();


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

        // verifico que los indicadores estan dentro del rango 
        // para emitir por output
        if (data[0].servicio_deuda <= 20.00 && data[0].valor_presente_deuda <= 200.00) {
          this.tipoNotaRiocp.emit('APROBACIÓN');
        } else {
          this.tipoNotaRiocp.emit('RECHAZO');
        }


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
          valor_presente_deuda_total: `${data[0].valor_presente_deuda}`,
        });

      }, error(err) {
        console.error(err);
      },
    })

  }

  detectarRangoSD(e: any) {
    let valorNumerico = parseFloat(e); // Convierte a número

    if (isNaN(valorNumerico)) {
      this.certificadoForm.patchValue({
        servicio_deuda: 0
      });

      this.tipoNotaRiocp.emit('RECHAZO');
      console.log(valorNumerico);
    }

    if (valorNumerico <= 20) {
      console.log(valorNumerico);
      this.tipoNotaRiocp.emit('APROBACIÓN');
    } else {
      this.tipoNotaRiocp.emit('RECHAZO');
    }
  }

  detectarRangoVPD(e: any) {
    let valorNumerico = parseFloat(e);

    console.log(valorNumerico);
  

    if (isNaN(valorNumerico)) {
      this.certificadoForm.patchValue({
        valor_presente_deuda_total: 0
      });
      this.tipoNotaRiocp.emit('RECHAZO');
    }

    if (valorNumerico <= 200) {
      console.log(valorNumerico);
      this.tipoNotaRiocp.emit('APROBACIÓN');
    } else {
      this.tipoNotaRiocp.emit('RECHAZO');
    }

  }

}

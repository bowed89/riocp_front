import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AcreedoresService } from 'src/app/shared/services/acreedores.service';
import { MonedasService } from 'src/app/shared/services/monedas.service';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarioEs } from 'src/app/shared/utils/calendario-es';
import { CronogramaDeudaService } from '../../services/cronograma-deuda.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TramitesService } from '../../services/tramites.service';


interface Pago {
  fechaVencimiento: string;
  capital: number;
  interes: number;
  comisiones: number;
  total: number;
  saldo: number;
}

@Component({
  selector: 'app-formulario-tres',
  templateUrl: './formulario-tres.component.html',
  styleUrls: ['./formulario-tres.component.scss']
})
export class FormularioTresComponent {
  saldoTotal: any;
  deudaForm!: FormGroup;
  acreedores: any[] = [{ name: '', code: '' }];
  monedas: any[] = [];
  token = localStorage.getItem('token');
  es: any;

  pagos: Pago[] = [];
  total: Pago = {
    fechaVencimiento: '',
    capital: 0,
    interes: 0,
    comisiones: 0,
    total: 0,
    saldo: 0
  };

  constructor(
    private fb: FormBuilder,
    public _acreedoresService: AcreedoresService,
    public _monedasService: MonedasService,
    public _messagesService: MessagesService,
    public _cronogramaDeudaService: CronogramaDeudaService,
    private primengConfig: PrimeNGConfig,
    public _tramitesService: TramitesService,


  ) {
    this.agregarFila();
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation(CalendarioEs);

    this.obtenerAcreedores();
    this.obtenerMonedas();

    this.deudaForm = this.fb.group({
      acreedor_id: ['', Validators.required],
      objeto_deuda: ['', Validators.required],
      moneda_id: ['', Validators.required],
      total_capital: [0, Validators.required],
      total_interes: [0, Validators.required],
      total_comisiones: [0, Validators.required],
      total_sum: [0, Validators.required],
      cuadro_pagos: this.fb.array([]),
      saldoTotal: [0, Validators.required], // Agregado

    });
    // Suscribirse a los cambios de `saldoTotal`
    this.deudaForm.get('saldoTotal')?.valueChanges.subscribe((nuevoSaldoTotal) => {
      this.actualizarSaldoInicial(nuevoSaldoTotal);
    });

    // Inicio con una fila de pagos
    this.agregarFila();

  }

  onSubmit() {
    // Agrego saldo y total manualmente  porque estan deshabilitados sus campos y no agregan automatico.
    // tambioen agrego las sumas totales
    const cuadroPagos = this.cuadroPagos.controls.map(control => {
      return {
        ...control.value,
        saldo: control.get('saldo')?.value,
        total: control.get('total')?.value,
        fecha_vencimiento: this.changeFormatDate(control.get('fecha_vencimiento')?.value),
      };
    });

    const deudaFormValue = {
      ...this.deudaForm.value,
      cuadro_pagos: cuadroPagos,
      total_capital: this.total.capital,
      total_comisiones: this.total.comisiones,
      total_interes: this.total.interes,
      total_sum: this.total.total
    };

    console.log(deudaFormValue);

    if (this.deudaForm.valid) {
      this._cronogramaDeudaService.PostCronogramaDeuda(deudaFormValue, this.token!)
        .subscribe({
          next: ({ message }) => {
            this._messagesService.MessageSuccess('Formulario Agregado', message!);
          },

          error: (error) => {
            console.log("error", error);

            this._messagesService.MessageError('Error al Agregar', error.error.message);
          },
          complete: () => {
            setTimeout(() => {
              console.log('El proceso ha finalizado completamente.');
            }, 2000);
          }
        });
    }
  }

  changeFormatDate(date: any) { // 2024-10-30
    let fechaOriginal = new Date(date);
    let year = fechaOriginal.getFullYear();
    let month = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaOriginal.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  obtenerAcreedores() {
    this._acreedoresService.GetAllAcreedores(this.token!).subscribe(({ data }) => {
      this.acreedores = data.map((acreedor: any) => ({
        nombre: acreedor.nombre,
        id: acreedor.id
      }));
    });
  }

  obtenerMonedas() {
    this._monedasService.GetAllMonedas(this.token!).subscribe(({ data }) => {
      this.monedas = data.map((moneda: any) => ({
        nombre: `${moneda.tipo} (${moneda.sigla})`,
        id: moneda.id
      }));
    });
  }

  get cuadroPagos(): FormArray {
    return this.deudaForm ? (this.deudaForm.get('cuadro_pagos') as FormArray) : this.fb.array([]);

  }

  actualizarTotales() {
    this.total.capital = 0;
    this.total.interes = 0;
    this.total.comisiones = 0;
    this.total.total = 0;

    this.cuadroPagos.controls.forEach((pago) => {
      this.total.capital += +pago.get('capital')?.value || 0;
      this.total.interes += +pago.get('interes')?.value || 0;
      this.total.comisiones += +pago.get('comisiones')?.value || 0;
      this.total.total += +pago.get('total')?.value || 0;
    });

    // Redondear los totales a dos decimales
    this.total.capital = Math.round(this.total.capital * 100) / 100;
    this.total.interes = Math.round(this.total.interes * 100) / 100;
    this.total.comisiones = Math.round(this.total.comisiones * 100) / 100;
    this.total.total = Math.round(this.total.total * 100) / 100;

  }

  formatTotal(value: number): string {
    const formatter = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(value);
  }


  agregarFila() {
    const index = this.cuadroPagos.length; //  indice de la nueva fila
    // Obtengo el saldo de la fila anterior o 0 si es la primera fila
    // const saldoAnterior = index > 0 ? this.cuadroPagos.at(index - 1).get('saldo')?.value : 0;
    const saldoAnterior = index > 0 ? this.cuadroPagos.at(index - 1).get('saldo')?.value : 0;

    let cuadro = this.fb.group({
      fecha_vencimiento: ['', Validators.required],
      capital: [0, Validators.required],
      interes: [0, Validators.required],
      comisiones: [0, Validators.required],
      total: [{ value: 0, disabled: true }, Validators.required],
      saldo: [{ value: saldoAnterior - (index > 0 ? this.cuadroPagos.at(index - 1).get('capital')?.value || 0 : 0), disabled: true }, Validators.required]
    });

    // sumo capital + interes + comisiones  y lo muestro en el campo total
    cuadro.get('capital')?.valueChanges.subscribe(() => this.calcularTotal(cuadro, index));
    cuadro.get('interes')?.valueChanges.subscribe(() => this.calcularTotal(cuadro, index));
    cuadro.get('comisiones')?.valueChanges.subscribe(() => this.calcularTotal(cuadro, index));

    this.cuadroPagos.push(cuadro);
    this.actualizarTotales();
  }

  calcularTotal(cuadro: FormGroup, index: number) {
    const capitalValue = +cuadro.get('capital')?.value || 0;
    const interesValue = +cuadro.get('interes')?.value || 0;
    const comisionesValue = +cuadro.get('comisiones')?.value || 0;

    const totalPago = capitalValue + interesValue + comisionesValue;

    cuadro.get('total')?.setValue(totalPago);

    // Actualiza el saldo de la siguiente fila si existe
    if (index < this.cuadroPagos.length - 1) {
      const siguienteFila = this.cuadroPagos.at(index + 1);
      const saldoAnterior = cuadro.get('saldo')?.value || 0;
      siguienteFila.get('saldo')?.setValue(saldoAnterior - capitalValue);
    }
  }


  eliminarFila(index: number) {
    this.cuadroPagos.removeAt(index);
    this.actualizarTotales();
  }

  actualizarSaldoInicial(nuevoSaldoTotal: number) {
    if (this.cuadroPagos.length > 0) {
      this.cuadroPagos.at(0).patchValue({ saldo: nuevoSaldoTotal });
    }
  }

}

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AcreedoresService } from 'src/app/shared/services/acreedores.service';
import { MonedasService } from 'src/app/shared/services/monedas.service';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarioEs } from 'src/app/shared/utils/calendario-es';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CronogramaDeudaService } from 'src/app/modules/solicitante/tramites/services/cronograma-deuda.service';
import { TramitesService } from 'src/app/modules/solicitante/tramites/services/tramites.service';


interface Pago {
  fechaVencimiento: string;
  capital: number;
  interes: number;
  comisiones: number;
  total: number;
  saldo: number;
}

@Component({
  selector: 'app-formulario-tres-view',
  templateUrl: './formulario-tres.component.html',
  styleUrls: ['./formulario-tres.component.scss']
})
export class FormularioTresComponent {
  // MODAL
  @Input() visibleForm3: boolean = false;
  @Input() selectedSolicitudForm: any;

  @Output() visibleForm3Change: EventEmitter<boolean> = new EventEmitter<boolean>();


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
    private cdr: ChangeDetectorRef,

  ) {
  }

  ngOnChanges(): void {
    if (this.selectedSolicitudForm !== undefined && this.visibleForm3) {
      this.limpiarFormulario();
      this.obtenerCronogramaPorId();
      
      this.primengConfig.setTranslation(CalendarioEs);
      this.obtenerAcreedores();
      this.obtenerMonedas();
    }
  }

  ngOnInit(): void {
    this.deudaForm = this.fb.group({
      acreedor_id: ['', Validators.required],
      objeto_deuda: ['', Validators.required],
      moneda_id: ['', Validators.required],
      total_capital: [0, Validators.required],
      total_interes: [0, Validators.required],
      total_comisiones: [0, Validators.required],
      total_sum: [0, Validators.required],
      cuadro_pagos: this.fb.array([]),
      total_saldo: [0, Validators.required], // Agregado
    });

    // Suscribirse a los cambios de `total_saldo`
    this.deudaForm.get('total_saldo')?.valueChanges.subscribe((nuevoSaldoTotal) => {
      console.log("nuevoSaldoTotal", nuevoSaldoTotal);
      this.actualizarSaldoInicial(nuevoSaldoTotal);
    });

    this.deudaForm.disable();

  }

  closeModal() {
    this.visibleForm3 = false;
    this.visibleForm3Change.emit(this.visibleForm3);
  }

  limpiarFormulario() {
    const cuadroPagosArray = this.deudaForm.get('cuadro_pagos') as FormArray;
    cuadroPagosArray.clear();
    this.deudaForm.reset();
    this.cdr.detectChanges();

  }


  changeFormatDate(date: any) { // 2024-10-30
    let fechaOriginal = new Date(date);
    let year = fechaOriginal.getFullYear();
    let month = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaOriginal.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  obtenerCronogramaPorId() {
    this._cronogramaDeudaService.GetCronogramaById(this.selectedSolicitudForm, this.token!)
      .subscribe({
        next: ({ data }: any) => {
          this.deudaForm.patchValue({
            acreedor_id: data.data.acreedor_id,
            objeto_deuda: data.data.objeto_deuda,
            moneda_id: data.data.moneda_id,
            total_saldo: data.data.total_saldo,
          });

          data.data.cuadro_pagos.forEach((pago: any) => {
            pago.fecha_vencimiento = new Date(pago.fecha_vencimiento);
            this.agregarFilaDesdeServicio(pago);
          });

          this.actualizarTotales();

        }, error: (err) => {
          console.error(err);
        }

      })
  }

  agregarFilaDesdeServicio(pago: any) {
    const fila = this.fb.group({
      fecha_vencimiento: [pago.fecha_vencimiento, Validators.required],
      capital: [parseFloat(pago.capital), Validators.required],
      interes: [parseFloat(pago.interes), Validators.required],
      comisiones: [parseFloat(pago.comisiones), Validators.required],
      total: [{ value: parseFloat(pago.total), disabled: true }, Validators.required],
      saldo: [{ value: parseFloat(pago.saldo), disabled: true }, Validators.required],
      estado: [pago.estado]
    });

    fila.disable();
    // Agregar la fila al FormArray
    this.cuadroPagos.push(fila);
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


  restarSaldoConCapital(i: number) {
    if (i === 0) {
      // Restar capital de la primera fila con saldo principal
      const SaldoFirstRow = this.deudaForm.get('total_saldo')?.value;
      const CapitalFirstRow = this.cuadroPagos.at(0).get('capital')?.value;
      this.cuadroPagos.at(0).patchValue({ saldo: (Math.round(SaldoFirstRow * 100) / 100) - (Math.round(CapitalFirstRow * 100) / 100) });

    } else {
      // Restar capital de las siguientes filas con saldo de la fila anterior
      const SaldoNextRow = this.cuadroPagos.at(i - 1).get('saldo')?.value;
      const CapitalNextRow = this.cuadroPagos.at(i).get('capital')?.value;
      this.cuadroPagos.at(i).patchValue({ saldo: (Math.round(SaldoNextRow * 100) / 100) - (Math.round(CapitalNextRow * 100) / 100) });
    }
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
    const saldoAnterior = index > 0 ? this.cuadroPagos.at(index - 1).get('saldo')?.value : 0;

    console.log("saldoAnterior ===>", saldoAnterior);

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



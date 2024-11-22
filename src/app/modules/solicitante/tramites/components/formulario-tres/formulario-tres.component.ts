import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  deudaForm!: FormGroup;
  acreedores: any[] = [{ name: '', code: '' }];
  monedas: any[] = [];
  token = localStorage.getItem('token');
  es: any;

  indexFilas: any;

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
    private cdr: ChangeDetectorRef,
    public _acreedoresService: AcreedoresService,
    public _monedasService: MonedasService,
    public _messagesService: MessagesService,
    public _cronogramaDeudaService: CronogramaDeudaService,
    private primengConfig: PrimeNGConfig,
    public _tramitesService: TramitesService,
  ) {
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
      total_saldo: [0, Validators.required]
    });

    // Suscribirse a los cambios de `total_saldo`
    this.deudaForm.get('total_saldo')?.valueChanges.subscribe((nuevoSaldoTotal) => {
      console.log("nuevoSaldoTotal", nuevoSaldoTotal);
      console.log("indexes ==>" + this.indexFilas);

      // si total_saldo es cero o esta vacio borro Capital y Saldo de todas las filas agregadas
      if (nuevoSaldoTotal === null || nuevoSaldoTotal === 0) {
        for (let i = 0; i <= this.indexFilas; i++) {
          this.cuadroPagos.at(i).patchValue({ capital: 0 });
          this.cuadroPagos.at(i).patchValue({ saldo: 0 });
        }
      }
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

  llamarDosMetodos(index?: number) {
    this.restarSaldoConCapital(index!);
    this.actualizarTotales();
  }

  restarSaldoConCapital(i: number) {

    if (i === 0) {
      console.log('entra a i =>>');
      console.log('saldo total =>>', this.deudaForm.get('total_saldo')?.value);

      // Restar capital de la primera fila con saldo principal
      // Obtengo saldo_total
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

  restarSaldoConCapitalPrimeraFila() {


    console.log('entra a i =>>');
    console.log('saldo total =>>', this.deudaForm.get('total_saldo')?.value);

    // Restar capital de la primera fila con saldo principal
    // Obtengo saldo_total
    const SaldoFirstRow = this.deudaForm.get('total_saldo')?.value;
    const CapitalFirstRow = this.cuadroPagos.at(0).get('capital')?.value;
    this.cuadroPagos.at(0).patchValue({ saldo: (Math.round(SaldoFirstRow * 100) / 100) - (Math.round(CapitalFirstRow * 100) / 100) });


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

  obtenerIndex(index: number) {
    this.indexFilas = index;
  }


  agregarFila() {
    const index = this.cuadroPagos.length; //  indice de la nueva fila

    this.obtenerIndex(index);

    // Obtengo el saldo de la fila anterior o 0 si es la primera fila
    const saldoAnterior = index > 0 ? this.cuadroPagos.at(index - 1).get('saldo')?.value : 0;

    console.log("saldoAnterior ===>", saldoAnterior);

    let cuadro = this.fb.group({
      fecha_vencimiento: ['', Validators.required],
      capital: [0, [Validators.required, this.nonNegativeValidator]],
      interes: [0, [Validators.required, this.nonNegativeValidator]],
      comisiones: [0, [Validators.required, this.nonNegativeValidator]],
      total: [0, [Validators.required, this.nonNegativeValidator]],
      saldo: [0, [Validators.required, this.nonNegativeValidator]]
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
    if (index > 0) {
      this.cuadroPagos.removeAt(index);
      this.actualizarTotales();
      /* 
        cuando elimino una fila al inicio me sale error,
        para q angular detecte esos cambios agrego 'cdr' 
      */
      this.cdr.detectChanges();
    }

  }


  actualizarSaldoInicial(nuevoSaldoTotal: number) {
    if (this.cuadroPagos.length > 0) {
      this.cuadroPagos.at(0).patchValue({ saldo: nuevoSaldoTotal });
    }
  }

  // Funcion para validar que los numeros no sean negativos en FB
  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
    return control.value >= 0 ? null : { nonNegative: true };
  }

  // bloque los campos total y saldo
  blockKeyPress(event: KeyboardEvent): void {
    event.preventDefault(); // Evita que cualquier tecla afecte el input
  }

}


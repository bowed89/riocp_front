import { Component } from '@angular/core';


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
  pagos: Pago[] = [];
  total: Pago = {
    fechaVencimiento: '',
    capital: 0,
    interes: 0,
    comisiones: 0,
    total: 0,
    saldo: 0
  };

  constructor() { 
    this.agregarFila();
  }

  agregarFila() {
    const nuevaFila: Pago = {
      fechaVencimiento: '',
      capital: 0,
      interes: 0,
      comisiones: 0,
      total: 0,
      saldo: 0
    };

    this.pagos.push(nuevaFila);
    this.actualizarTotales();

    console.log(this.pagos);
    console.log(this.total);
  }


  actualizarTotales() {
    this.total.capital = 0;
    this.total.interes = 0;
    this.total.comisiones = 0;
    this.total.total = 0;

    for (const pago of this.pagos) {
      this.total.capital += pago.capital;
      this.total.interes += pago.interes;
      this.total.comisiones += pago.comisiones;
      this.total.total += pago.total;
    }
  }

  eliminarFila(index: number) {
    this.pagos.splice(index, 1);
    this.actualizarTotales();
  }

}

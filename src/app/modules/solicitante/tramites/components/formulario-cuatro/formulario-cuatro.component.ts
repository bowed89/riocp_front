import { Component } from '@angular/core';

interface Desembolso {
  fecha: string;
  monto: number;
}

interface Pago {
  objetoDeuda: string;
  acreedor: string;
  montoContratado: number;
  montoDesembolsado: number;
  desistido: boolean;
  fechasDesembolsos: Desembolso[];
}

@Component({
  selector: 'app-formulario-cuatro',
  templateUrl: './formulario-cuatro.component.html',
  styleUrls: ['./formulario-cuatro.component.scss']
})
export class FormularioCuatroComponent {
  pagos: Pago[] = [];

  total = {
    montoContratado: 0,
    montoDesembolsado: 0,
    totalMontoDesembolsos: 0 // Suma total de los montos de desembolsos
  };

  constructor() {
    this.agregarFila();
  }

  agregarFila() {
    const nuevaFila: Pago = {
      objetoDeuda: '',
      acreedor: '',
      montoContratado: 0,
      montoDesembolsado: 0,
      desistido: false,
      fechasDesembolsos: [
        { fecha: '', monto: 0 }
      ]
    };

    this.pagos.push(nuevaFila);
    this.actualizarTotales(); // sumar los totales al agregar una fila nueva

  }

  eliminarFila(index: number) {
    this.pagos.splice(index, 1); // Elimina la fila seleccionada
    this.actualizarTotales(); // Actualiza los totales
  }

  agregarFechaMonto(index: number) {
    const nuevaFechaMonto: Desembolso = {
      fecha: '',
      monto: 0
    };
    this.pagos[index].fechasDesembolsos.push(nuevaFechaMonto); // Agrega nueva fila de fecha y monto
  }

  eliminarFechaMonto(indexPago: number, indexDesembolso: number) {
    this.pagos[indexPago].fechasDesembolsos.splice(indexDesembolso, 1); // Elimina la fila de fecha y monto
    this.actualizarTotales(); // Actualiza los totales
  }


  actualizarTotales() {
    // Reiniciar los totales
    this.total.montoContratado = 0;
    this.total.montoDesembolsado = 0;
    this.total.totalMontoDesembolsos = 0;

    // Calcular los totales
    for (const pago of this.pagos) {
      this.total.montoContratado += pago.montoContratado;
      this.total.montoDesembolsado += pago.montoDesembolsado;

      // Sumar los montos de desembolsos
      for (const desembolso of pago.fechasDesembolsos) {
        this.total.totalMontoDesembolsos += desembolso.monto;
      }
    }
  }
}

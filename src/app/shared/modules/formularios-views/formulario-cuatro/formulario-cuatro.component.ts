import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CronogramaDesembolsoService } from 'src/app/modules/solicitante/tramites/services/cronograma-desembolso.service';
import { TramitesService } from 'src/app/modules/solicitante/tramites/services/tramites.service';
import { AcreedoresService } from 'src/app/shared/services/acreedores.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface Desembolso {
  fecha: string;
  monto: number;
}

interface Pago {
  objeto_deuda: string;
  monto_contratado_a: number;
  monto_desembolsado_b: number;
  saldo_desembolso_a_b: number;
  acreedor_id: string;
  desembolso_desistido: boolean;
  fecha_desembolsos: Desembolso[];
  fechaDisabled: true;
  montoDisabled: true;
  totalDesembolsos: number;  // Total de montos de desembolsos por fila de pago
}

@Component({
  selector: 'app-formulario-cuatro-view',
  templateUrl: './formulario-cuatro.component.html',
  styleUrls: ['./formulario-cuatro.component.scss']
})
export class FormularioCuatroComponent {
  // MODAL
  @Input() visibleForm4: boolean = false;
  @Input() selectedSolicitudForm: any;

  @Output() visibleForm4Change: EventEmitter<boolean> = new EventEmitter<boolean>();


  pagos: Pago[] = [];
  token = localStorage.getItem('token');
  acreedores: any[] = [{ name: '', code: '' }];

  fechaDisabled = true;
  montoDisabled = true;

  totalGeneralDesembolsos: number = 0; // Suma total de todos los desembolsos de todas las filas

  constructor(
    public _acreedoresService: AcreedoresService,
    public _cronogramaDesembolsoService: CronogramaDesembolsoService,
    public _messagesService: MessagesService,
    public _tramitesService: TramitesService,


  ) {
  }

  ngOnChanges(): void {
    
    if (this.selectedSolicitudForm !== undefined && this.visibleForm4) {
      console.log("this.selectedSolicitudForm 4??? " + this.selectedSolicitudForm);
      this.limpiarFormulario();
      this.obtenerCronogramaPorId();
      this.obtenerAcreedores();

    }
      
  }

  ngOnInit(): void {
  }

  limpiarFormulario() {
    this.pagos = [];
  }

  obtenerCronogramaPorId() {
    this._cronogramaDesembolsoService.GetCronogramaById(this.selectedSolicitudForm, this.token!)
      .subscribe({
        next: ({ data }: any) => {
          data.data.forEach((desembolso: any) => {
            this.agregarFilasDesdeServicio(desembolso);
          });
        }, error: (err) => {
          this._messagesService.MessageError('Error', err.error.message)
        }
      })
  }

  agregarFilasDesdeServicio(pago: any) {
    const nuevaFechaMontos: Desembolso[] = pago.cronograma_desembolsos.map((desembolso: any) => ({
      fecha: desembolso.fecha,
      monto: desembolso.monto
    }));

    let nuevaFila: Pago = {
      objeto_deuda: pago.objeto_deuda,
      acreedor_id: pago.acreedor_id,
      monto_contratado_a: pago.monto_contratado_a,
      monto_desembolsado_b: pago.monto_desembolsado_b,
      saldo_desembolso_a_b: pago.saldo_desembolso_a_b,
      desembolso_desistido: pago.desembolso_desistido,
      fecha_desembolsos: nuevaFechaMontos,
      fechaDisabled: true,
      montoDisabled: true,
      totalDesembolsos: 0
    };
    this.pagos.push(nuevaFila);
  }

  closeModal() {
    this.visibleForm4 = false;
    this.visibleForm4Change.emit(this.visibleForm4);



  }

  obtenerAcreedores() {
    this._acreedoresService.GetAllAcreedores(this.token!).subscribe(({ data }) => {
      this.acreedores = data.map((acreedor: any) => ({
        nombre: acreedor.nombre,
        id: acreedor.id
      }));
    });
  }

  onSubmit() {
    const body = {
      "cronograma_desembolsos": this.pagos
    }

    this._cronogramaDesembolsoService.PostCronogramaDesembolso(body, this.token!)
      .subscribe({
        next: ({ message }) => {

          this._messagesService.MessageSuccess('Formulario Agregado', message!);
        },

        error: (error) => {
          console.log("error", error);

          this._messagesService.MessageError('Error al Agregar', error.error.message);
        },

      });

  }

  agregarFila() {
    const nuevaFila: Pago = {
      objeto_deuda: '',
      acreedor_id: '',
      monto_contratado_a: 0,
      monto_desembolsado_b: 0,
      saldo_desembolso_a_b: 0,
      desembolso_desistido: true,
      fecha_desembolsos: [],
      fechaDisabled: true,
      montoDisabled: true,
      totalDesembolsos: 0 // Inicializar en 0
    };

    this.pagos.push(nuevaFila);
    // this.recalcularTotalDesembolsos(this.pagos.length - 1);
  }

  eliminarFila(index: number) {
    this.pagos.splice(index, 1);
    this.actualizarTotalGeneral();
  }

  agregarFechaMonto(index: number) {
    const nuevaFechaMonto: Desembolso = {
      fecha: '',
      monto: 0
    };
    this.pagos[index].fecha_desembolsos.push(nuevaFechaMonto);
    this.recalcularTotalDesembolsos(index);
  }

  eliminarFechaMonto(indexPago: number, indexDesembolso: number) {
    this.pagos[indexPago].fecha_desembolsos.splice(indexDesembolso, 1); // Elimina la fila de fecha y monto
    this.recalcularTotalDesembolsos(indexPago); // Recalcula el total de desembolsos después de eliminar
  }

  // Método para recalcular la suma de los desembolsos por fila de pago
  recalcularTotalDesembolsos(index: number) {
    console.log("index=> ", index);

    const pago = this.pagos[index];
    pago.totalDesembolsos = pago.fecha_desembolsos.reduce((sum, desembolso) => sum + Number(desembolso.monto || 0), 0);
    pago.totalDesembolsos = Number(pago.totalDesembolsos.toFixed(2));  // Redondea a 2 decimales
    this.actualizarTotalGeneral();

  }

  // Método para recalcular el total general de todos los desembolsos
  actualizarTotalGeneral() {
    this.totalGeneralDesembolsos = this.pagos.reduce((sum, pago) => sum + pago.totalDesembolsos, 0);
  }

  restaDeSaldoDesembolso(a: any, b: any, index: number) {
    this.pagos[index].saldo_desembolso_a_b = a - b;
  }

  deshabilitarFechaMonto(event: any, index: number): void {
    this.pagos[index].fechaDisabled = event;
    this.pagos[index].montoDisabled = event;
  }
}
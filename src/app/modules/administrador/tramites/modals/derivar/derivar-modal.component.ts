import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { TecnicoService } from '../../services/tecnico.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})
export class DerivarModalComponent {

  @Input() visible: boolean = false;
  @Input() selectedSolicitud: any;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() seguimientoChanged = new EventEmitter<void>();

  nroHojaRuta: string = '';
  selectedTecnico: any;
  observaciones: string = '';

  tecnicos: any[] = [];
  token = localStorage.getItem('token');

  constructor(
    public _tecnicoService: TecnicoService,
    public _messagesService: MessagesService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnChanges(): void {
    console.log('getId ===>' + this.selectedSolicitud);
    console.log('getId2 ===>' + this.selectedSeguimiento);


  }

  ngOnInit(): void {
    this._tecnicoService.GetTecnicos(this.token!).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.tecnicos = data.map((tecnico: any) => ({
          nombre: `${tecnico.nombre} ${tecnico.apellido}`,
          id: tecnico.id
        }));

      },
    })

  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }


  onSubmit() {
    let body = {
      observacion: this.observaciones,
      solicitud_id: this.selectedSolicitud,
      usuario_destino_id: this.selectedTecnico,
      nro_hoja_ruta: this.nroHojaRuta,
      id_seguimiento: this.selectedSeguimiento
    }

    console.log('Técnico body:', body);

    this._tecnicoService.PostSeguimientoAdmin(body, this.token!).subscribe({
      next: ({ message }) => {
        this._messagesService.MessageSuccess('Formulario Agregado', message!);
        this.seguimientoChanged.emit();
        this.closeModal();
      },
      error: (error) => {
        console.log(error.error.errors);
        this._messagesService.MessageError('Error al Agregar', error.error.message);
        this.closeModal();

      },
    })



    // Aquí puedes agregar la lógica para guardar los datos, como llamar a un servicio API.

  }

}

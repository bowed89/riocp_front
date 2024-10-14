import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { TecnicoService } from '../../services/tecnico.service';

@Component({
  selector: 'app-derivar-modal',
  templateUrl: './derivar-modal.component.html',
  styleUrls: ['./derivar-modal.component.scss']
})
export class DerivarModalComponent {

  @Input() visible: boolean = false;
  @Input() selectedSeguimiento: any;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userAdded = new EventEmitter<void>();

  nroHojaRuta: string = '';
  selectedTecnico: any;
  observaciones: string = '';

  tecnicos: any[] = [];
  token = localStorage.getItem('token');

  constructor(
    public _tecnicoService: TecnicoService

  ) {

  }

  ngOnChanges(): void {
    console.log('getId ===>' + this.selectedSeguimiento);

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

    // Lógica para manejar el envío del formulario

    let body = {
      observacion: this.observaciones,
      solicitud_id: this.selectedSeguimiento,
      usuario_destino_id: this.selectedTecnico,
      nro_hoja_ruta: this.nroHojaRuta
    }

    console.log('Técnico body:', body);

    this._tecnicoService.PostSeguimientoAdmin(body, this.token!).subscribe({
      next: (value) => {
        console.log(value);
        
      },
    })



    // Aquí puedes agregar la lógica para guardar los datos, como llamar a un servicio API.

  }

}

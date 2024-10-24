import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnexosService } from 'src/app/modules/solicitante/tramites/services/anexos.service';
import { InformacionDeudaService } from 'src/app/modules/solicitante/tramites/services/informacion-deuda.service';
import { TramitesService } from 'src/app/modules/solicitante/tramites/services/tramites.service';
import { AbrirDocumentoService } from 'src/app/shared/services/abrir-documento.service';
import { MessagesService } from 'src/app/shared/services/messages.service';


@Component({
  selector: 'app-formulario-dos-view',
  templateUrl: './formulario-dos.component.html',
  styleUrls: ['./formulario-dos.component.scss']
})
export class FormularioDosComponent {
  // MODAL
  @Input() visibleForm2: boolean = false;
  @Input() selectedSolicitudForm: any;

  @Output() visibleForm2Change: EventEmitter<boolean> = new EventEmitter<boolean>();

  deudaForm!: FormGroup;
  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    public _messagesService: MessagesService,
    public _informacionDeudaService: InformacionDeudaService,
    public _tramitesService: TramitesService,
    public _anexosService: AnexosService,
    public _abrirDocumentoService: AbrirDocumentoService

  ) { }

  ngOnChanges(): void {
    console.log('form2!!', this.selectedSolicitudForm);
    if (this.selectedSolicitudForm !== undefined)
      this.getAllInformacionById();

  }

  ngOnInit(): void {
    this.deudaForm = this.fb.group({
      pregunta_1: [null, Validators.required],
      pregunta_2: [null, Validators.required],
      pregunta_3: [null, Validators.required],
      pregunta_4: [null, Validators.required],
      documento: [null],
      solicitud_id: [0],
    });
  }

  closeModal() {
    this.visibleForm2 = false;
    this.visibleForm2Change.emit(this.visibleForm2);
  }

  getAllInformacionById() {
    this._informacionDeudaService.GetInformacionById(this.token!, this.selectedSolicitudForm).subscribe({
      next: ({ data }: any) => {
        this.deudaForm.patchValue({
          pregunta_1: data[0].pregunta_1,
          pregunta_2: data[0].pregunta_2,
          pregunta_3: data[0].pregunta_3,
          pregunta_4: data[0].pregunta_4,
        });

        this.deudaForm.disable();

      }, error(err) {
        console.error(err);
      },
    });
  }



  onFileRemove() {
    this.deudaForm.get('documento')?.setValue(null);
  }

  openDocument() {
    this._abrirDocumentoService.GetDocumento(this.token!, this.selectedSolicitudForm, 4).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf';
        a.click();
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}

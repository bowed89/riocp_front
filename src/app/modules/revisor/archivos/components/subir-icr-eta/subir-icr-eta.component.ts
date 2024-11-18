import { Component } from '@angular/core';
import { SubirArchivosService } from '../../services/subir-archivos.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-subir-icr-eta',
  templateUrl: './subir-icr-eta.component.html',
  styleUrls: ['./subir-icr-eta.component.scss']
})
export class SubirIcrEtaComponent {
  token = localStorage.getItem('token');
  file: File | null = null;
  activeBtn: boolean = true;
  spinner: boolean = false;

  constructor(
    public _subirArchivosService: SubirArchivosService,
    public _messagesService: MessagesService

  ) { }

  ngOnInit(): void { }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.file = file;
      this.activeBtn = false;
    }

  }

  onFileRemove() {
    this.file = null;
    this.activeBtn = true;
    this.spinner = false;
  }

  onSubmit() {
    const formData = new FormData();
    this.spinner = true;
    this.activeBtn = true;

    formData.append('file', this.file!);
    formData.append('tipo_documento_id', "7"); // id de promedio icr eta-up

    this._subirArchivosService.PostSubirIcrEta(formData, this.token!).subscribe({
      next: (value: any) => {
        console.log(value);
        this._messagesService.MessageSuccess('Archivo Exportado', value);

        this.onFileRemove();
      }, error: (err: any) => {
        console.error(err);
        this._messagesService.MessageError('Error', err.error.message);
        this.onFileRemove();
      },
    })
  }
}

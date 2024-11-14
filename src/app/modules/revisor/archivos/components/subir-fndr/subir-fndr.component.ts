import { Component } from '@angular/core';
import { SubirArchivosService } from '../../services/subir-archivos.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-fndr.component.html',
  styleUrls: ['./subir-fndr.component.scss']
})
export class SubirFndrComponent {
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
    formData.append('file', this.file!);
    formData.append('tipo_documento_id', "5"); // id de fndr de tipos_documentos_adjunto 
    this.spinner = true;
    this.activeBtn = true;

    this._subirArchivosService.PostSubirFndr(formData, this.token!).subscribe({
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

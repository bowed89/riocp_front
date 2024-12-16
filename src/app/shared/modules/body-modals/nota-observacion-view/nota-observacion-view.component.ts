import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotaCertificadoRiocpService } from 'src/app/shared/services/nota-certificado-riocp.service';

@Component({
  selector: 'app-nota-observacion-view',
  templateUrl: './nota-observacion-view.component.html',
  styleUrls: ['./nota-observacion-view.component.scss']
})
export class NotaObservacionViewComponent {
  @Input() selectedSolicitud!: number
  token = localStorage.getItem('token');
  pdfUrl: any;
  constructor(
    public _notaCertificadoRiocpService: NotaCertificadoRiocpService,
    private sanitizer: DomSanitizer
  ) {
    // Sanear la URL para evitar el error NG0904
    //this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/prueba.html'); // Cambia a .pdf si es necesario
  }

  ngOnInit() {
    this.generarNotaObservacion();



  }

  ngOnChanges(): void {
    console.log(this.selectedSolicitud);
    if (this.selectedSolicitud !== undefined) {
      this.verNotas(this.selectedSolicitud);
    }
  }

  generarNotaObservacion() {
    const body = {
      nombre: 'juancito perez'
    }

    this._notaCertificadoRiocpService.PostNotaObservacion(this.token!, body)
      .subscribe({
        next: (value) => {
          const blob = new Blob([value], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);


        }, error: (error) => {
          console.error(error);
        }
      })
  }

  verNotas(selectedSolicitud: number) {
    this._notaCertificadoRiocpService
      .GetNotaObservadorVerificadaRevisor(this.token!, selectedSolicitud)
      .subscribe({
        next: (value) => {
          console.log(value);

        }, error: (error) => {
          console.error(error);
        }

      })
  }

}

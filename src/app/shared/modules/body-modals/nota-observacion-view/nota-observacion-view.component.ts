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
    @Input() rolRevisarObservacion!: string;
    esDagft_Vctp = false;

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
    }

    ngOnChanges(): void {

        console.log("this.rolRevisarObservacion ==>" + this.rolRevisarObservacion);

        if (this.selectedSolicitud !== undefined && this.rolRevisarObservacion !== undefined) {
            if (this.rolRevisarObservacion === 'REVISOR') {
                this.verNotasRevisor();

            }
            else if (this.rolRevisarObservacion === 'DGAFT') {
                this.esDagft_Vctp = true;
                this.verNotasDgaft();

            }
            else if (this.rolRevisarObservacion === 'JEFE UNIDAD') {
                this.verNotasJefeUnidad();
            }
        }
    }

    verNotasJefeUnidad() {
        this._notaCertificadoRiocpService.GetNotaObservadorVerificadaJefeUnidad(this.token!, this.selectedSolicitud)
            .subscribe({
                next: ({ data }) => {

                    console.log(data);

                    /* Obtener notas */
                    this._notaCertificadoRiocpService.PostNotaObservacion(this.token!, data)
                        .subscribe({
                            next: (value) => {

                                const blob = new Blob([value], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

                            }, error: (error) => {
                                console.error(error);
                            }
                        })


                }, error: (error) => {
                    console.error(error);
                }

            })
    }


    verNotasDgaft() {
        this._notaCertificadoRiocpService
            .GetNotaObservadorVerificadaRevisor(this.token!, this.selectedSolicitud)
            .subscribe({
                next: ({ data }) => {

                    console.log(data);

                    /* Obtener notas */
                    this._notaCertificadoRiocpService.PostNotaObservacion(this.token!, data)
                        .subscribe({
                            next: (value) => {

                                const blob = new Blob([value], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

                            }, error: (error) => {
                                console.error(error);
                            }
                        })


                }, error: (error) => {
                    console.error(error);
                }

            })
    }

    verNotasRevisor() {
        this._notaCertificadoRiocpService.GetNotaObservadorVerificadaTecnico(this.token!, this.selectedSolicitud)
            .subscribe({
                next: ({ data }) => {

                    console.log(data);

                    /* Obtener notas */
                    this._notaCertificadoRiocpService.PostNotaObservacion(this.token!, data)
                        .subscribe({
                            next: (value) => {

                                const blob = new Blob([value], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

                            }, error: (error) => {
                                console.error(error);
                            }
                        })


                }, error: (error) => {
                    console.error(error);
                }

            })
    }


    /* SUBIR Y BORRAR ARCHIVOS */
    onFileSelect(event: any) {
        const file = event.files[0];

        console.log(file);
        
        /* if (file) {
            const maxSize = 11000000; // 11MB max
            if (file.type !== 'application/pdf') {
                this.solicitudForm.get('documento')?.setErrors({ invalidFileType: true });
            } else if (file.size > maxSize) {
                this.solicitudForm.get('documento')?.setErrors({ maxSizeExceeded: true });
            } else {
                // Convertir pdf a base64 y validar firma digital
                this.spinnerFirma = true;

                this._firmaDigitalService.ValidateDigitalSign(file, this.token!).subscribe(data => {
                    console.log("firma digital ===>", data);
                    this.spinnerFirma = true;
                    this.onFileRemove();

                    if (data.length > 0) {
                        // valido cadenaConfianza,noModificado,firmadoAntesRevocacion,firmadoDuranteVigencia sean true
                        if (data[0].cadenaConfianza &&
                            data[0].noModificado &&
                            data[0].firmadoAntesRevocacion &&
                            data[0].firmadoDuranteVigencia) {

                            this.firmaValido = true;
                            this.firmaNombre = data[0].certificado.nombreSignatario;
                            this.firmaInicioValidez = data[0].certificado.inicioValidez;
                            this.firmaFinValidez = data[0].certificado.finValidez;

                            this.solicitudForm.patchValue({ firma_digital: 1, entidad_id: this.idEntidad });
                            this.solicitudForm.get('documento')?.setErrors(null); // Resetea errores si es válido
                            this.solicitudForm.get('documento')?.setValue(file); // Guardar el archivo en el control

                        } else {
                            this.firmaMensajeError = 'LA VALIDEZ DE LA FIRMA DIGITAL VENCIO O TIENE PROBLEMAS';
                            this.solicitudForm.patchValue({ firma_digital: 0 });
                        }

                    } else {
                        this.firmaNoValido = true;
                        this.firmaMensajeError = 'EL DOCUMENTO NO CUENTA CON FIRMA DIGITAL';
                        this.solicitudForm.patchValue({ firma_digital: 0 });

                    }
                    this.spinnerFirma = false;
                });

            }
        } */
    }

    onFileRemove() {
      /*   this.solicitudForm.get('documento')?.setValue('');
        this.firmaValido = false;
        this.firmaNoValido = false;
        this.firmaNombre = ''
        this.firmaInicioValidez = ''
        this.firmaFinValidez = '' */
    }

}

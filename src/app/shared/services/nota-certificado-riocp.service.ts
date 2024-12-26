import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';


@Injectable({
    providedIn: 'root'
})
export class NotaCertificadoRiocpService {

    cargarUnaVezNota = '';
    // si es true tiene una nota cargada anteriormente
    tieneNotaCargadaAnterior: boolean = true;

    constructor(
        private http: HttpClient,
    ) { }

    private getHttpOptions(token: string): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
    }

    GetDatosNotaObservacionRiocp(token: string, solicitudId: number): Observable<Response<any>> {
        const url = `${API.local}/nota-observacion-certificado-riocp/${solicitudId}`;
        return this.http.get<Response<any>>(url, this.getHttpOptions(token));
    }

    GetDatosNotaAprobadoRiocp(token: string, solicitudId: number): Observable<Response<any>> {
        const url = `${API.local}/nota-aprobado-certificado-riocp/${solicitudId}`;
        return this.http.get<Response<any>>(url, this.getHttpOptions(token));
    }


    GetDatosNotaRechazoRiocp(token: string, solicitudId: number, sd: any, vpd: any): Observable<Response<any>> {
        const url = `${API.local}/nota-rechazo-certificado-riocp/${solicitudId}/${sd}/${vpd}`;
        return this.http.get<Response<any>>(url, this.getHttpOptions(token));
    }

    /* GENERAR NOTAS DESDE EL BACKEND */
    /*   PostNotaObservacion(token: string, body: any): Observable<any> {
        const url = `${API.local}/nota-observacion-view`;
        return this.http.post<any>(url, this.getHttpOptions(token), body);
      }
     */

    PostNotaObservacion(token: string, body: any): Observable<any> {
        const url = `${API.local}/nota-observacion-view`;

        // Configura los headers
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        // Retorna la petición HTTP con `responseType: 'text'`
        return this.http.post(url, body, {
            headers: headers,
            responseType: 'text', // Cambiar el tipo de respuesta a texto
        });
    }

    GetNotaObservadorVerificadaRevisor(token: string, solicitudId: number): Observable<any> {
        return this.http.get<any>(`${API.local}/usuario/dgaft/notas-observacion/${solicitudId}`, this.getHttpOptions(token))

    }


    GetNotaObservadorVerificadaTecnico(token: string, solicitudId: number): Observable<any> {
        return this.http.get<any>(`${API.local}/usuario/revisor/notas-observacion/${solicitudId}`, this.getHttpOptions(token))

    }


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';


export interface TipoObservacion {
  observacion: string,
  estado: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SeguimientoOperadorService {

  constructor(
    private http: HttpClient
  ) { }

  private getHttpOptions(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  GetRevisores(token: string): Observable<Response<any>> {
    const url = `${API.local}/usuario/revisor`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  GetSeguimientoOperador(token: string): Observable<Response<any>> {
    const url = `${API.local}/seguimiento/operador/main`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  GetTipoObservacion(token: string): Observable<Response<TipoObservacion>> {
    const url = `${API.local}/operador/tipo-observacion`;
    return this.http.get<Response<TipoObservacion>>(url, this.getHttpOptions(token));
  }

  PostTipoObservacion(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/operador/tipo-observacion`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };

  PostAsignarRevisorAJefeUnidad(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/seguimiento/operador/store`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };


  generatePDF(token: string, body: any): Observable<Blob> {
    const url = `${API.local}/generar-pdf`;

    // Ajuste para manejar la respuesta como 'blob'
    return this.http.post(url, body, {
      headers: this.getHttpOptions(token).headers,
      responseType: 'blob' // Especificar que la respuesta será binaria
    });
  }



}

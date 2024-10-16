import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';

export interface FormState {
  isValid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AnexosService {

  constructor(
    private http: HttpClient
  ) { }

  private getHttpOptions(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  PostAnexos1(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/documento-adjunto-1-2/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };

  PostAnexos2(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/documento-adjunto-2/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };

  PostAnexos3(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/documento-adjunto-3/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };




}

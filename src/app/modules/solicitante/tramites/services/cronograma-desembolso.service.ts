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

export class CronogramaDesembolsoService {

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

  PostCronogramaDesembolso(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/cronograma-desembolso-deuda/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };

  GetCronogramaById(id: number, token: string): Observable<Response<any>> {
    const url = `${API.local}/cronograma-desembolso-deuda/formulario/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  };


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Solicitud } from '../interfaces/solicitud.interface';
import { Response } from 'src/app/shared/interfaces/response.interface';

export interface FormState {
  isValid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class CronogramaDeudaService {

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

  PostCronogramaDeuda(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/cronograma-deuda/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };

  GetCronogramaById(id: number, token: string): Observable<Response<any>> {
    const url = `${API.local}/cronograma-deuda/formulario/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  };



}

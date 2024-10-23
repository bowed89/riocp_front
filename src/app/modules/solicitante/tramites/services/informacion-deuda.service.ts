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

export class InformacionDeudaService {

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

    GetInformacionById(token: string, id: number): Observable<Response<any>> {
    const url = `${API.local}/informacion-deuda/id/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  PostInformacionDeuda(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/informacion-deuda/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };


}

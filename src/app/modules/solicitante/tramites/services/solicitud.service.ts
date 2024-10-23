import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';

export interface FormState {
  isValid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class SolicitudService {

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

  GetSolicitudById(token: string, id: number): Observable<Response<any>> {
    const url = `${API.local}/solicitud-riocp/id/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  PostSolicitudRiocp(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/solicitud-riocp/formulario`;
    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };


}

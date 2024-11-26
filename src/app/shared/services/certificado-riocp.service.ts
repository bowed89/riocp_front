import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class CertificadoRiocpService {

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

  GetDatosCertificado(token: string, idSolicitud: number): Observable<Response<any>> {
    const url = `${API.local}/certificado-riocp/${idSolicitud}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }
  PostFormularioRegistro(body: object, token: string): Observable<any> {
    const url = `${API.local}/certificado-riocp/store`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  }


}

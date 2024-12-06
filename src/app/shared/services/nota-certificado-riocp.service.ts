import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class NotaCertificadoRiocpService {

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

  GetDatosNotaRechazoRiocp(token: string, solicitudId: number): Observable<Response<any>> {
    const url = `${API.local}/nota-rechazo-certificado-riocp/${solicitudId}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }



}

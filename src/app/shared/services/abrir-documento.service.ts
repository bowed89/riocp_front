import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';



@Injectable({
  providedIn: 'root'
})
export class AbrirDocumentoService {

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

  GetDocumento(token: string, id: number, idTipo: number) {
    const url = `${API.local}/abrir-documento/${id}/${idTipo}`

    return this.http.get(url, {
      responseType: 'blob',
      headers: this.getHttpOptions(token).headers
    });

  }

  GetDocumentoRiocp(token: string, id: number) {
    const url = `${API.local}/abrir-documento-riocp/${id}`

    return this.http.get(url, {
      responseType: 'blob',
      headers: this.getHttpOptions(token).headers
    });

  }





}

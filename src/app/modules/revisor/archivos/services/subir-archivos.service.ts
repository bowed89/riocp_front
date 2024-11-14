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

export class SubirArchivosService {

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

  PostSubirDeudaExterna(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/import/deuda-externa`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };

  
  PostSubirFndr(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/import/fndr-excel`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };

  PostSubirBalanceGeneral(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/import/balance-general`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };
  
  

}

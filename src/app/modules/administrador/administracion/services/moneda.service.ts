import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

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

  GetMonedas(token: string): Observable<Response<any>> {
    const url = `${API.local}/monedas`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  GetMonedaById(id: number | null, token: string): Observable<any> {
    const url = `${API.local}/monedas/show/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token)).pipe(
      map((response: any) => response.data)
    )
  }

  CreateMoneda(usuario: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/monedas`;
    return this.http.post<Response<any>>(url, usuario, this.getHttpOptions(token));
  }

  UpdateMoneda(usuario: any, id: number, token: string): Observable<Response<any>> {
    const url = `${API.local}/monedas/${id}`;
    return this.http.put<Response<any>>(url, usuario, this.getHttpOptions(token));
  }

}

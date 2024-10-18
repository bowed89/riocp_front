import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class SeguimientoRevisorService {

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

  GetJefeUnidad(token: string): Observable<Response<any>> {
    const url = `${API.local}/usuario/jefe-unidad`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

  GetSeguimientoRevisor(token: string): Observable<Response<any>> {
    const url = `${API.local}/seguimiento/revisor/main`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }


  PostAsignarRevisorJefeUnidad(body: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/seguimiento/revisor/store`;
    return this.http.post<Response<any>>(url, body, this.getHttpOptions(token));
  };


}

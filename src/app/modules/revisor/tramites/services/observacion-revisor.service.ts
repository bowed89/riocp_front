import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from 'src/app/shared/interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class ObservacionRevisorService {

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

  GetTecnicoObservacion(token: string, id: number): Observable<Response<any>> {
    const url = `${API.local}/usuario/revisor/${id}`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }



}

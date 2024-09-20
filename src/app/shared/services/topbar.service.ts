import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { API } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {
  public sharedDataEntidad: any = null;
  public tipoRol: number = 0;

  constructor(
    private http: HttpClient,
  ) { }

  private getHttpOptions(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  GetEntidadSolicitante(id: number, token: string): Observable<any> {
    const url = `${API.local}/entidades/solicitante/${id}`;
    return this.http.get(url, this.getHttpOptions(token));
  }

}

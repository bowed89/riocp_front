import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../../shared/interfaces/response.interface';
import { Entidades } from '../../modules/administrador/administracion/interfaces/entidades.interface';
import { EntidadUserRol } from '../interfaces/entidad-user-rol.interface';


@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

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

  GetEntidades(token: string): Observable<Response<Entidades>> {
    const url = `${API.local}/entidades`;
    return this.http.get<Response<Entidades>>(url, this.getHttpOptions(token));
  }

  GetEntidadByUserRol(token: string): Observable<Response<EntidadUserRol>> {
    const url = `${API.local}/entidades/usuario/rol`;
    return this.http.get<Response<EntidadUserRol>>(url, this.getHttpOptions(token));
  }

  
}

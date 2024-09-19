import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Usuarios } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  GetUsers(token: string): Observable<Response<Usuarios>> {
    const url = `${API.local}/usuarios`;
    return this.http.get<Response<Usuarios>>(url, this.getHttpOptions(token));
  }

  GetUserById(id: number | null, token: string): Observable<Usuarios> {
    const url = `${API.local}/usuarios/${id}`;
    return this.http.get<Response<Usuarios>>(url, this.getHttpOptions(token)).pipe(
      map((response: any) => response.data)
    )
  }

  CreateUser(usuario: Usuarios, token: string): Observable<Response<Usuarios>> {
    const url = `${API.local}/usuarios`;
    return this.http.post<Response<Usuarios>>(url, usuario, this.getHttpOptions(token));
  }

  UpdateUser(usuario: Usuarios, id: number, token: string): Observable<Response<Usuarios>> {
    const url = `${API.local}/usuarios/${id}`;
    return this.http.put<Response<Usuarios>>(url, usuario, this.getHttpOptions(token));
  }

}

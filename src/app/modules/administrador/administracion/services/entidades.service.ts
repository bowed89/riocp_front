import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Entidades } from '../interfaces/entidades.interface';

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

}

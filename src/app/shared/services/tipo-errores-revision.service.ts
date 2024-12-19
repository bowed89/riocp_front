import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';
import { Acreedores } from '../interfaces/acreedores.interface';


@Injectable({
  providedIn: 'root'
})
export class TipoErroresRevisionService {

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

  TipoErrores(token: string): Observable<any> {
    const url = `${API.local}/tipo-errores`;
    return this.http.get<any>(url, this.getHttpOptions(token));
  }

}

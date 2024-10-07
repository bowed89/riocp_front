import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';
import { Periodos } from '../interfaces/periodos.interface';


@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

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

  GetAllPeriodos(token: string): Observable<Response<Periodos>> {
    const url = `${API.local}/periodos`;
    return this.http.get<Response<Periodos>>(url, this.getHttpOptions(token));
  }

  
}

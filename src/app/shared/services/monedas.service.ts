import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';
import { Monedas } from '../interfaces/monedas.interface';


@Injectable({
  providedIn: 'root'
})
export class MonedasService {

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

  GetAllMonedas(token: string): Observable<Response<Monedas>> {
    const url = `${API.local}/monedas`;
    return this.http.get<Response<Monedas>>(url, this.getHttpOptions(token));
  }



  
}

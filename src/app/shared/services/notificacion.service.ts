import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';
import { Monedas } from '../interfaces/monedas.interface';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

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

  NotificacionJefeUnidad(token: string): Observable<Response<any>> {
    const url = `${API.local}/notificaciones`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  }

}

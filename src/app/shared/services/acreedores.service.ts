import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../interfaces/response.interface';
import { Acreedores } from '../interfaces/acreedores.interface';


@Injectable({
  providedIn: 'root'
})
export class AcreedoresService {

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

  GetAllAcreedores(token: string): Observable<Response<Acreedores>> {
    const url = `${API.local}/acreedores`;
    return this.http.get<Response<Acreedores>>(url, this.getHttpOptions(token));
  }



  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/interfaces/response.interface';
import { API } from 'src/app/shared/api/api';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  disabledFormulario1 = true;
  disabledFormulario2 = true;
  disabledFormulario3 = true;
  disabledFormulario4 = true;
  disabledCorrespondencia = true;

  notificacionChange = 0;


  disabledAnexo1 = true;
  disabledAnexo3 = true;

  constructor(
    private http: HttpClient
  ) { }

  private getHttpOptions(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  GetAllTramitesSolicitante(token: string): Observable<Response<any>> {
    const url = `${API.local}/tramite-solicitante`;
    return this.http.get<Response<any>>(url, this.getHttpOptions(token));
  };


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Roles } from 'src/app/shared/interfaces/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

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

  GetRoles(token: string): Observable<Response<Roles>> {
    const url = `${API.local}/roles`;
    return this.http.get<Response<Roles>>(url, this.getHttpOptions(token));
  }

}

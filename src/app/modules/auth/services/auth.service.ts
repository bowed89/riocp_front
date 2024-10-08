import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Login } from '../interfaces/login.interface';
import { ResponseLogin } from '../interfaces/response-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  AuthLogin(body: Login): Observable<ResponseLogin> {
    const url = `${API.local}/auth/login`;
    return this.http.post<ResponseLogin>(url, body);
  }

  AuthLogout(token: string) {
    const url = `${API.local}/auth/logout`;
    return this.http.get(url, this.getHttpOptions(token));
  }
}

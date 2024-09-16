import { HttpClient } from '@angular/common/http';
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

  AuthLogin(body: Login): Observable<ResponseLogin> {
    const url = `${API.local}/auth/login`;
    return this.http.post<ResponseLogin>(url, body);
  }
}

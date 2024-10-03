import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Solicitud } from '../interfaces/solicitud.interface';
import { Response } from 'src/app/shared/interfaces/response.interface';

export interface FormState {
  isValid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  private formValidSource = new BehaviorSubject<FormState>({ isValid: false, message: '' });
  formValid$ = this.formValidSource.asObservable();

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


  SetFormValid(isValid: boolean, message: string) {
    this.formValidSource.next({ isValid, message });
  }
  

  PostNewSolicitud(solicitud: Solicitud, token: string): Observable<any> {
    const url = `${API.local}/solicitud`;
    return this.http.post<Response<Solicitud>>(url, solicitud, this.getHttpOptions(token));
  };

}

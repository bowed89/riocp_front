import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from 'src/app/shared/api/api';
import { Correspondencia } from '../interfaces/correspondencia.interface';
import { Response } from 'src/app/shared/interfaces/response.interface';

export interface FormState {
  isValid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {
  private formValidSource = new BehaviorSubject<FormState>({ isValid: false, message: '' });
  formValid$ = this.formValidSource.asObservable();

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


  SetFormValid(isValid: boolean, message: string) {
    this.formValidSource.next({ isValid, message });
  }

  PostFormularioRegistro(formData: FormData, token: string): Observable<any> {
    const url = `${API.local}/formulario-correspondencia`;
    return this.http.post<Response<Correspondencia>>(url, formData, this.getHttpOptions(token));

  }

  PostSolicitudCorrespondencia(formData: FormData, token: string): Observable<Response<any>> {
    const url = `${API.local}/formulario-correspondencia/formulario-solicitud`;
    return this.http.post<Response<any>>(url, formData, this.getHttpOptions(token));

  }


}

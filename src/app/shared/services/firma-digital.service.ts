import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/api/api';
import { Observable } from 'rxjs';
import { BodySign } from '../interfaces/body-sign.interface';

@Injectable({
  providedIn: 'root'
})
export class FirmaDigitalService {

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

  ValidateDigitalSign(file: File, token: string): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; 
        const body: BodySign = { tipo: "application/pdf", base64: base64String };
        const url = `${API.local}/validar-firma`;

        this.http.post(url, body, this.getHttpOptions(token)).subscribe({
          next: (data) => {
            observer.next(data);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
    });
  }


}

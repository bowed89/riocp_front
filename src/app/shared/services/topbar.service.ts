import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { API } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {
  public sharedDataEntidad: any = null;
  public tipoRol: number = 0;

  constructor(
    private http: HttpClient,
  ) { }


}

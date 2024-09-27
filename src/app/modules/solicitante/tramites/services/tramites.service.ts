import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  FormRegistroValid: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

}

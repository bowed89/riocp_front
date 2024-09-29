import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  private formValidSource = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  setFormValid(isValid: boolean) {
    this.formValidSource.next(isValid);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  SetFormValid(isValid: boolean, message: string) {
    this.formValidSource.next({ isValid, message });
  }



}

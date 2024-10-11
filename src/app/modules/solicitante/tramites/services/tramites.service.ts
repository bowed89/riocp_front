import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preguntas } from '../components/main-tramite/main-tramite.component';

export interface FormState {
  isValid: boolean;
  message: string;
  preguntas?: Preguntas;
}

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  private formValidSource = new BehaviorSubject<FormState>(
    {
      isValid: false,
      message: '',
      preguntas: { pregunta_1: false, pregunta_2: false, pregunta_3: false, pregunta_4: false }
    });

  formValid$ = this.formValidSource.asObservable();

  constructor(
  ) { }

  SetFormValid(isValid: boolean, message: string, preguntas?: Preguntas) {
    this.formValidSource.next({ isValid, message, preguntas });
  }


}

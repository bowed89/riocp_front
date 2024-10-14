import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  disabledFormulario1 = true;
  disabledFormulario2 = true;
  disabledFormulario3 = true;
  disabledFormulario4 = true;
  disabledCorrespondencia = true;

  disabledAnexo1 = true;
  disabledAnexo2 = true;
  disabledAnexo3 = true;
  
  constructor() { }



}

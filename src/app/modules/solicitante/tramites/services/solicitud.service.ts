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

export class SolicitudService {

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

  PostSolicitudRiocp(solicitud: any, token: string): Observable<Response<any>> {
    const url = `${API.local}/solicitud-riocp/formulario`;

    console.log("sdsdsd", solicitud);

/*     const formData = new FormData();
    formData.append('entidad_id', solicitud.entidad_id.toString());  // Convertir a string si es necesario
    formData.append('identificador_id', solicitud.identificador_id.toString());
    formData.append('acreedor_id', solicitud.acreedor_id.toString());
    formData.append('monto_total', solicitud.monto_total.toString());
    formData.append('moneda_id', solicitud.moneda_id.toString());
    formData.append('plazo', solicitud.plazo.toString());
    formData.append('interes_anual', solicitud.interes_anual.toString());
    formData.append('comisiones', solicitud.comisiones);
    formData.append('periodo_id', solicitud.periodo_id.toString());
    formData.append('objeto_operacion_credito', solicitud.objeto_operacion_credito);
    formData.append('nombre_completo', solicitud.nombre_completo);
    formData.append('cargo', solicitud.cargo);
    formData.append('correo_electronico', solicitud.correo_electronico);
    formData.append('telefono', solicitud.telefono);
    formData.append('firma_digital', solicitud.firma_digital ? 'true' : 'false'); */

    // Asegurarse de que el archivo se está adjuntando correctamente
 /*    if (solicitud.documento instanceof File) {
      formData.append('documento', solicitud.documento, solicitud.documento.name);
    }
 */

    return this.http.post<Response<any>>(url, solicitud, this.getHttpOptions(token));
  };


}

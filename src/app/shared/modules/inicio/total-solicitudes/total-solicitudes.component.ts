import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-solicitudes',
  templateUrl: './total-solicitudes.component.html',
  styleUrls: ['./total-solicitudes.component.scss']
})
export class TotalSolicitudesComponent {
  @Input() derivado!: string; 
  @Input() noDerivado!: string; 

}

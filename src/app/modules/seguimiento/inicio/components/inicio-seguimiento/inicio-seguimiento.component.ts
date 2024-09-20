import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-seguimiento',
  templateUrl: './inicio-seguimiento.component.html',
  styleUrls: ['./inicio-seguimiento.component.scss']
})
export class InicioSeguimientoComponent {
  items!: MenuItem[];

  products!: any[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;
}

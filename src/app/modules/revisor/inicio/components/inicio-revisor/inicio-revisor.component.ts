import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-revisor',
  templateUrl: './inicio-revisor.component.html',
  styleUrls: ['./inicio-revisor.component.scss']
})
export class InicioRevisorComponent {
  items!: MenuItem[];
  products!: any[];
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
}

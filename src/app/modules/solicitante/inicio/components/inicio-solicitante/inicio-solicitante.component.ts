import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-inicio-solicitante',
  templateUrl: './inicio-solicitante.component.html',
  styleUrls: ['./inicio-solicitante.component.scss']
})
export class InicioSolicitanteComponent {

  items!: MenuItem[];

  products!: any[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  constructor(public layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }



  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
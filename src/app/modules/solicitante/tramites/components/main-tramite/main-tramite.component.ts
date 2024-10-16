import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TramitesService } from '../../services/tramites.service';
import { MenuPestaniaService } from '../../services/menu-pestanias.service';
import { WebSocketService } from 'src/app/shared/services/websocket.service';


export interface Preguntas {
  pregunta_1: boolean,
  pregunta_2: boolean,
  pregunta_3: boolean,
  pregunta_4: boolean,
}

@Component({
  selector: 'app-main-tramite',
  templateUrl: './main-tramite.component.html',
  styleUrls: ['./main-tramite.component.scss']
})
export class MainTramiteComponent {
  token = localStorage.getItem('token');
  routeItems: MenuItem[] = [];
  showContainer = true;
  //activeItem: MenuItem;

  values: MenuItem[] = [];

  constructor(
    public _tramitesService: TramitesService,
    public _menuPestaniaService: MenuPestaniaService,
    private webSocketService: WebSocketService

  ) {
  }
  ngOnInit() {
    this.getMenu();
    this.webSocketService.listenToMenuUpdates((data) => {
      console.log('Menú webSocketService ===>', data.data);

      this._tramitesService.disabledFormulario1 = data.data[0].disabled;
      this._tramitesService.disabledFormulario2 = data.data[1].disabled;
      this._tramitesService.disabledFormulario3 = data.data[2].disabled;
      this._tramitesService.disabledFormulario4 = data.data[3].disabled;

      this._tramitesService.disabledAnexo1 = data.data[4].disabled;
      this._tramitesService.disabledAnexo3 = data.data[5].disabled;
      this._tramitesService.disabledCorrespondencia = data.data[6].disabled;

      if (data.data[0].disabled && data.data[1].disabled &&
        data.data[2].disabled && data.data[3].disabled &&
        data.data[4].disabled && data.data[5].disabled &&
        data.data[6].disabled
      ) {
        this.showContainer = false;
      }

      this.values = data.data;

    });
  }

  getMenu() {
    this._menuPestaniaService.GetActivePestania(this.token!).subscribe({
      next: ({ data }) => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}

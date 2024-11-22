import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() seguimientos: any[] = [];
  @Input() title: string = '';
  @Input() inicioActivo: boolean = false;

  @Output() enviarSeguimiento = new EventEmitter();

  addDerivar(valor: any) {
    this.enviarSeguimiento.emit(valor);
  }

}

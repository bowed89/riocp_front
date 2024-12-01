import { Component } from '@angular/core';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { RoleService } from '../../services/roles.service';
import { MonedaService } from '../../services/moneda.service';

@Component({
  selector: 'moneda-component',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent {
  token = localStorage.getItem('token');
  monedas: any[] = [];
  newVisible: boolean = false;
  newVisibleUpdate: boolean = false;
  id: number = 0;
  selectedCategory: string | null = null;
  searchText: string = '';

  constructor(
    public _monedaService: MonedaService,
    public _roleService: RoleService

  ) { }

  ngOnInit() {
    this.getAllMonedas();
  }

  addMoneda() {
    this.newVisible = true;
  }

  updateMoneda(id: number) {
    this.id = id;
    console.log(this.id);
    this.newVisibleUpdate = true;
  }

  getAllMonedas() {
    this._monedaService.GetMonedas(this.token!).subscribe({
      next: (res) => {
        this.monedas = res.data;
      },
    });

  }



  showAllDropDown() {
    /*  if (Number(this.selectedRol) === 0) {
    
     } */
  }

  showAllInput() {
    if (this.searchText === '') {
      this.getAllMonedas();
    }
  }

  applyFilter() {
    this.monedas = this.monedas.filter(moneda => {
      const matchesName = this.searchText ?
        (moneda.tipo.toLowerCase().includes(this.searchText.trim().toLowerCase())) : true;
      return matchesName;
    });
  }

  editUser(id: number) {
    console.log(id);
  }

  // Método para actualizar la tabla cuando se agrega un usuario
  onUserAdded() {
    this.getAllMonedas();
  }

}

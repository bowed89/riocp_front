import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { RoleService } from '../../services/roles.service';

@Component({
  selector: 'usuarios-component',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  users: any[] = [];
  roles: any[] = [];

  categories = [
    { label: 'All', value: null },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Accessories', value: 'Accessories' },
  ];

  statuses = [
    { label: 'All', value: null },
    { label: 'Available', value: 'Available' },
    { label: 'Out of Stock', value: 'Out of Stock' },
  ];

  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';


  constructor(
    public _usuariosService: UsuariosService,
    public _roleService: RoleService

  ) { }

  ngOnInit() {
    this.getAllUsers();
    this.GetAllRoles();
  }

  getAllUsers() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._usuariosService.GetUsers(token).subscribe(({ data }) => {
        data.map(user => {
          if (user.rol !== undefined) {
            user.rol = capitalizeFirstLetter(user.rol)
          }
        });
        this.users = data;
      });
    }
  }

  GetAllRoles() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._roleService.GetRoles(token).subscribe(({ data }) => {
        const all = { label: 'Mostrar Todo', value: 0 }
        this.roles.push(all)
        data.map(value => {
          value.rol = capitalizeFirstLetter(value.rol);
          this.roles.push({
            label: value.rol,
            value: value.id
          });
        });
      });
    }
  }

  showAllDropDown() {
    if (Number(this.selectedRol) === 0) {
      this.getAllUsers();
    }
  }

  showAllInput() {
    if (this.searchText === '') {
      this.getAllUsers();
    }
  }

  applyFilter() {
    console.log('Role:', this.selectedRol);
    console.log('Search Text:', this.searchText);

    this.users = this.users.filter(user => {
      const matchesRol = this.selectedRol ? user.rol_id === this.selectedRol : true;
      const matchesName = this.searchText ?
        (user.nombre && user.nombre.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (user.apellido && user.apellido.toLowerCase().includes(this.searchText.toLowerCase()))
        : true;
      return matchesRol && matchesName;
    });
  }


}

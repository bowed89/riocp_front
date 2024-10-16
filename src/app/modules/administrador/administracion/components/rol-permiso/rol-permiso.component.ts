import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { RoleService } from '../../services/roles.service';

@Component({
  selector: 'rol-permiso-component',
  templateUrl: './rol-permiso.component.html',
  styleUrls: ['./rol-permiso.component.scss']
})
export class RolPermisoComponent {
  users: any[] = [];
  roles: any[] = [];
  newVisible: boolean = false;
  newVisibleUpdate: boolean = false;
  id: number = 0;
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

  addUser() {
    this.newVisible = true;
  }

  updateUser(id: number) {
    this.id = id;
    console.log(this.id);
    this.newVisibleUpdate = true;
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

        console.log(this.users);

      });
    }
  }

  GetAllRoles() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._roleService.GetRoles(token).subscribe(({ data }) => {
        const all = { label: 'Mostrar Todo', value: 0 }
        this.roles.push(all)
        data.map((value) => {
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
    this.users = this.users.filter(user => {
      const matchesRol = this.selectedRol ? user.rol_id === this.selectedRol : true;
      const matchesName = this.searchText ?
        (user.nombre && user.nombre.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (user.apellido && user.apellido.toLowerCase().includes(this.searchText.toLowerCase()))
        : true;
      return matchesRol && matchesName;
    });
  }

  editUser(id: number) {
    console.log(id);
  }

  // Método para actualizar la tabla cuando se agrega un usuario
  onUserAdded() {
    this.getAllUsers();
  }
  
}

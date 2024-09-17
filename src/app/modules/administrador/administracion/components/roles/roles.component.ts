import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { RoleService } from '../../services/roles.service';
import { Roles } from 'src/app/shared/interfaces/roles.interface';

@Component({
  selector: 'roles-component',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  roles: Roles[] = [];
  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';


  constructor(
    public _usuariosService: UsuariosService,
    public _roleService: RoleService

  ) { }

  ngOnInit() {
    this.GetAllRoles();
  }

  GetAllRoles() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._roleService.GetRoles(token).subscribe(({ data }) => {
        data.map(value => value.rol = capitalizeFirstLetter(value.rol))
        this.roles = data;
      });
    }
  }

  filterRol() {
    this.searchText = (this.searchText).toLowerCase();
    this.searchText = this.searchText.replace(/\s+/g, ' ').trim();
    this.roles = this.roles.filter(data => (data.rol).toLowerCase() === this.searchText);
  }

  filterChanges() {
    if (this.searchText === '') {
      this.GetAllRoles();
    }
  }


}

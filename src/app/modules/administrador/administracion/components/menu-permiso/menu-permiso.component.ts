import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { RoleService } from '../../services/roles.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'menu-permiso-component',
  templateUrl: './menu-permiso.component.html',
  styleUrls: ['./menu-permiso.component.scss']
})
export class MenuPermisoComponent {

  users: any[] = [];
  roles: any[] = [];
  menus: any[] = [];

  newVisible: boolean = false;
  newVisibleUpdate: boolean = false;
  id: number = 0;
  selectedCategory: string | null = null;
  selectedRol: string | null = null;
  searchText: string = '';


  constructor(
    public _menuService: MenuService
  ) { }

  ngOnInit() {
    this.getAllMenus();
  }

  addUser() {
    this.newVisible = true;
  }

  updateUser(id: number) {
    this.id = id;
    console.log(this.id);
    this.newVisibleUpdate = true;
  }

  getAllMenus() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._menuService.GetMenus(token).subscribe(({ data }) => {

        data.map(value => {
          if (value.rol === 1) {
            value.rol = 'Solicitante'
          } else if (value.rol === 2) {
            value.rol = 'Administrador'
          } else if (value.rol === 3) {
            value.rol = 'Operador'
          } else if (value.rol === 4) {
            value.rol = 'Seguimiento'
          }

        });

        /*  data.map(user => {
           if (user.rol !== undefined) {
             user.rol = capitalizeFirstLetter(user.rol)
           }
         }); */
        this.menus = data;


      });
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



}

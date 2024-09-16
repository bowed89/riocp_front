import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { MenuChangeEvent } from '../api/menuchangeevent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../shared/interfaces/response.interface';
import { API } from '../../shared/api/api';
import { capitalizeFirstLetter } from 'src/app/shared/utils/capitalizeFirstLetter';
import { Menu } from '../interfaces/menu.interface';

interface ResultMenu {
    label: string,
    items: any[]
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();

    constructor(private http: HttpClient) { }

    private getHttpOptions(token: string): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
    }

    GetMenuByUser(token: string): Observable<Response<Menu>> {
        const url = `${API.local}/menu/rol/user`;
        return this.http.get<Response<Menu>>(url, this.getHttpOptions(token));
    }

    StructureMenu(): Observable<ResultMenu> {
        let name = '';
        const token = localStorage.getItem('token');

        if (!token) {
            return of({
                label: 'SIN ROLES',
                items: []
            });
        }

        return this.GetMenuByUser(token).pipe(map(({ data }) => {
            const menus: any[] = [];

            data.forEach(menu => {
                const transformedType = capitalizeFirstLetter(menu.tipo);
                let existingLabel = menus.find(group => group.label === transformedType);
                name = this.getNameByRol(menu.rol);

                const item = {
                    label: menu.nombre,
                    icon: menu.icono,
                    routerLink: [menu.url]
                };

                if (existingLabel) {
                    existingLabel.items.push(item);

                } else {
                    menus.push({
                        label: transformedType,
                        items: [item]
                    });
                }
            });

            return {
                label: name,
                items: menus
            };

        }));
    }

    getNameByRol(id: number): string {
        if (id === 1) {
            return 'Entidad Solicitante';
        }
        if (id === 2) {
            return 'Administrador';
        }
        if (id === 3) {
            return 'Operador';
        }
        if (id === 4) {
            return 'Seguimiento';
        }
        return 'Desconocido';
    }

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }
}

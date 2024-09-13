import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuService } from './app.menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    arrayList: any[] = [];

    constructor(
        public layoutService: LayoutService,
        public _menuService: MenuService
    ) { }

    ngOnInit() {
        this._menuService.getAllMenu().subscribe(({ data }) => {
            data.forEach(({ nombre, icono, url }: any) => {
                this.arrayList.push({
                    label: nombre, icon: icono, routerLink: [`/${url}`]
                });
            });

            this.model = [
                {
                    items: this.arrayList
                }
            ];
        });
    }
}

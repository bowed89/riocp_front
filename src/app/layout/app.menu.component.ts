import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuService } from './service/app.menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    url: any[] = [];

    constructor(
        public layoutService: LayoutService,
        public _menuService: MenuService
    ) { }

    ngOnInit() {
        this.getAllmenu();
    }

    getAllmenu() {
        this._menuService.StructureMenu().subscribe(res => {
            console.log(res);
            this.model.push(res);
        });
    }
}

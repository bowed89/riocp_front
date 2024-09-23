import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login.interface';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ResponseLogin } from '../../interfaces/response-login.interface';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/layout/service/app.menu.service';
import { TopBarService } from 'src/app/shared/services/topbar.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    body: Login = { correo: '', password: '' };
    valCheck: string[] = ['remember'];

    constructor(
        public layoutService: LayoutService,
        public _authService: AuthService,
        public _messagesService: MessagesService,
        private _menuService: MenuService,
        private router: Router
    ) { }

    login() {
        this._authService.AuthLogin(this.body).subscribe({
            next: (data: ResponseLogin) => {
                localStorage.setItem('token', data.token);
                this._messagesService.MessageSuccess('Bienvenido', 'Inicio de Sesión Correctamente');
                const token = localStorage.getItem('token');

                // obtengo la url de inicio del rol y me direcciono:
                if (token) {
                    this._menuService.GetMenuByUser(token).subscribe(({ data }) => {
                        const allowedUrls = data.map(value => value.url);
                        const routeInicio = allowedUrls.find(route => route.includes('inicio'));
                        this.router.navigate([`${routeInicio}`]);
                    });
                }
            },
            error: ({ error }) => {
                this._messagesService.MessageError('Error', error.errors);
            }
        });
    }
}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from './modules/auth/guards/auth.guard';
import { urlGuard } from './modules/auth/guards/validate-url.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [authGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [urlGuard] },
                    { path: 'admin', loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule), canActivate: [urlGuard] },
                    { path: 'seguimiento', loadChildren: () => import('./modules/seguimiento/seguimiento.module').then(m => m.SeguimientoModule), canActivate: [urlGuard] },
                    { path: 'operador', loadChildren: () => import('./modules/operador/operador.module').then(m => m.OperadorModule), canActivate: [urlGuard] },
                    { path: 'solicitante', loadChildren: () => import('./modules/solicitante/solicitante.module').then(m => m.SolicitanteModule), canActivate: [urlGuard] },

                ]
            },
            { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

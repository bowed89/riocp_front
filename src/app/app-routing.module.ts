import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from './modules/auth/guards/auth.guard';
import { urlGuard } from './modules/auth/guards/validate-url.guard';
import { NotfoundComponent } from './shared/modules/formularios-views/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [authGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [urlGuard] },
                    { path: 'jefe-unidad', loadChildren: () => import('./modules/jefe-unidad/jefe-unidad.module').then(m => m.JefeUnidadModule), canActivate: [urlGuard] },
                    { path: 'operador', loadChildren: () => import('./modules/operador/operador.module').then(m => m.OperadorModule), canActivate: [urlGuard] },
                    { path: 'dgaft', loadChildren: () => import('./modules/dgaft/dgaft.module').then(m => m.DgaftModule), canActivate: [urlGuard] },
                    { path: 'solicitante', loadChildren: () => import('./modules/solicitante/solicitante.module').then(m => m.SolicitanteModule), canActivate: [urlGuard] },
                    { path: 'revisor', loadChildren: () => import('./modules/revisor/revisor.module').then(m => m.RevisorModule), canActivate: [urlGuard] },
                    { path: 'admin', loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule), canActivate: [urlGuard] },
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

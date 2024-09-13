import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('../../modules/auth/components/error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('../../modules/auth/components/access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('../../modules/auth/components/login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

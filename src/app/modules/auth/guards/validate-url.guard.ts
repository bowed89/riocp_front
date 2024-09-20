import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MenuService } from 'src/app/layout/service/app.menu.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class urlGuard implements CanActivate {
  constructor(
    private _menuService: MenuService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = localStorage.getItem('token');
    const currentUrl = state.url;
    console.log("currentUrl", currentUrl);

    if (token) {
      return this._menuService.GetMenuByUser(token).pipe(
        map(({ data }) => {
          const allowedUrls = data.map(value => value.url);
          console.log('allowedUrls', allowedUrls);

          if (allowedUrls.includes(currentUrl)) {
            return true;

          } else {
            this.router.navigate(['/notfound']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/auth/login']);
          return of(false);
        })
      );

    } else {
      this.router.navigate(['/auth/login']);
      return of(false);
    }
  }
}

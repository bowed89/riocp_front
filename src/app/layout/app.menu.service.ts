import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';
import { API } from '../shared/api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();

    token = '2|AeWR69p1Sz8ylZFZsfz8adgmVuwHcuTokky6zoWN0ac66bed';

    constructor(private http: HttpClient) { }

    private getHttpOptions(): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        };
    }

    getAllMenu(): Observable<any> {
        const url = `${API.local}/menu`;
        return this.http.get<any>(url, this.getHttpOptions());
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

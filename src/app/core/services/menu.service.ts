import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// define the data structure
export interface MenuItem {
    id: number;
    title: string;
    url: string;
    order_no: number;
    is_active: number;
}

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private apiUrl = 'http://localhost:8000/api/menus';

    constructor(private http: HttpClient) {}

    getMenus(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.apiUrl);
    }
}
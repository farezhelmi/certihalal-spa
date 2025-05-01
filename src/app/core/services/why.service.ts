import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface WhySection {
  id: number;
  title: string;
  description: string;
  icon: string;
  order_no: number;
}

@Injectable({
  providedIn: 'root'
})
export class WhyService {
  // private apiUrl = 'http://localhost:8000/api/why-sections';
  private apiUrl = `${environment.apiBaseUrl}/why-sections`;
  
    constructor(private http: HttpClient) { }
  
    getWhys(): Observable<WhySection[]> {
      return this.http.get<WhySection[]>(this.apiUrl);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceSection {
  id: number;
  icon: string;
  title: string;
  description: string;
  order_no: number;
  is_active: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:8000/api/service-sections';

  constructor(private http: HttpClient) { }

  getServices(): Observable<ServiceSection[]> {
    return this.http.get<ServiceSection[]>(this.apiUrl);
  }
}

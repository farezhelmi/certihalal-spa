import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface AboutSection {
  id:number;
  heading: string;
  content: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  // private apiUrl = 'http://localhost:8000/api/about-sections'
  private apiUrl = `${environment.apiBaseUrl}/about-sections`;

  constructor(private http: HttpClient) { }

  getAbout(): Observable<AboutSection[]> {
    return this.http.get<AboutSection[]>(this.apiUrl);
  }

}

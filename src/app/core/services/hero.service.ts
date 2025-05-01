import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  background_image: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // private apiUrl = 'http://localhost:8000/api/hero-sections';
  private apiUrl = `${environment.apiBaseUrl}/hero-sections`;

  constructor(private http: HttpClient) { }

  getHero(): Observable<HeroSection[]> {
    return this.http.get<HeroSection[]>(this.apiUrl);
  }
}

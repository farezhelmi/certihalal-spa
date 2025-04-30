import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FooterSection {
  id: number;
  company_name: string;
  address: string;
  email: string;
  phone: string;
  facebook_link: string;
  twitter_link: string;
  linkedin_link: string;
  is_active: number;

}

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private apiUrl = 'http://localhost:8000/api/footer-sections';

  constructor(private http: HttpClient) { }
    
  getFooters(): Observable<FooterSection[]> {
    return this.http.get<FooterSection[]>(this.apiUrl);
  }
}

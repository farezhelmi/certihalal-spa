import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface TrainerSection {
  id: number;
  name: string;
  designation: string;
  photo_url: string;
  bio: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  // private apiUrl = 'http://localhost:8000/api/trainer-sections';
  private apiUrl = `${environment.apiBaseUrl}/trainer-sections`;

  constructor(private http: HttpClient) { }

  getTrainers(): Observable<TrainerSection[]> {
    return this.http.get<TrainerSection[]>(this.apiUrl);
  }
}

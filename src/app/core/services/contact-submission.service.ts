import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactSubmissionService {

  private apiUrl = 'http://localhost:8000/api/contact-submissions';

  constructor(private http: HttpClient) { }

  sendMessage(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

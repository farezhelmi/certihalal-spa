import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ContactResponse {
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactSubmissionService {
  // private apiUrl = 'http://localhost:8000/api/contact-submissions';
  private apiUrl = `${environment.apiBaseUrl}/contact-submissions`;

  constructor(private http: HttpClient) { }

  sendMessage(
    data: ContactFormData,
    options: { headers?: HttpHeaders } = {}
  ): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...options.headers?.keys().reduce((acc, key) => ({
        ...acc,
        [key]: options.headers?.get(key)
      }), {})
    });

    return this.http.post<ContactResponse>(this.apiUrl, data, {
      headers,
      withCredentials: true
    });
  }
}

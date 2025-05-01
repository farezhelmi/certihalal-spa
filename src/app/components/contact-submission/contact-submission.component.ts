import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactSubmissionService } from '../../core/services/contact-submission.service';
import { FooterService, FooterSection } from '../../core/services/footer.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

@Component({
  selector: 'app-contact-submission',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [FormBuilder],
  templateUrl: './contact-submission.component.html',
  styleUrl: './contact-submission.component.scss',
  standalone: true 
})
export class ContactSubmissionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  footer: FooterSection | null = null;
  contactForm!: FormGroup;
  successMessage: string = '';
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactSubmissionService,
    private footerService: FooterService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFooterData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFooterData(): void {
    this.footerService.getFooter()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: FooterSection) => {
          this.footer = data;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching footer:', error);
          this.errorMessage = 'Unable to load footer information';
        }
    });
  }

  submitContactForm(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.resetMessages();

      this.http.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const csrfToken = decodeURIComponent(this.getCookie('XSRF-TOKEN'));
          const headers = new HttpHeaders().set('X-XSRF-TOKEN', csrfToken);
          
          this.contactService.sendMessage(this.contactForm.value as ContactFormData, { headers })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (response: ContactResponse) => {
                this.handleSuccess(response);
              },
              error: (err: HttpErrorResponse) => {
                this.handleError(err);
              },
              complete: () => {
                this.isSubmitting = false;
              }
            });
        },
        error: (err: HttpErrorResponse) => {
          this.handleCsrfError(err);
        }
      });
    }
  }

  private resetMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  private handleSuccess(response: ContactResponse): void {
    this.successMessage = response.message;
    this.toastr.success('Message sent successfully!', 'Success');
    this.contactForm.reset();
  }

  private handleError(error: HttpErrorResponse): void {
    console.error('Error submitting form:', error);
    this.errorMessage = 'Failed to submit form. Please try again.';
    this.toastr.error(this.errorMessage, 'Error');
    this.isSubmitting = false;
  }

  private handleCsrfError(error: HttpErrorResponse): void {
    console.error('Error fetching CSRF token:', error);
    this.errorMessage = 'Error establishing connection. Please try again.';
    this.toastr.error(this.errorMessage, 'Error');
    this.isSubmitting = false;
  }

  private getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }
}

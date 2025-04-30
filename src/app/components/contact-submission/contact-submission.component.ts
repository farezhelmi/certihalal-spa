import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactSubmissionService } from '../../core/services/contact-submission.service';
import { FooterService, FooterSection } from '../../core/services/footer.service';

@Component({
  selector: 'app-contact-submission',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-submission.component.html',
  styleUrl: './contact-submission.component.scss'
})
export class ContactSubmissionComponent {
  footers: FooterSection[] = [];

  contactForm: FormGroup;
  // submitted = false;
  // submitSuccess = false;
  // submitError = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactSubmissionService,
    private footerService: FooterService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.footerService.getFooters().subscribe((data) => {
      this.footers = data;
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.contactForm.reset();
        },
        error: () => {
          this.successMessage = 'Something went wrong. Please try again.';
        }
      });
    }
  }
}

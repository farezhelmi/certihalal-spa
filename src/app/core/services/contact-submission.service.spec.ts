import { TestBed } from '@angular/core/testing';

import { ContactSubmissionService } from './contact-submission.service';

describe('ContactSubmissionService', () => {
  let service: ContactSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { WhyService, WhySection } from '../../core/services/why.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-why',
  imports: [CommonModule],
  templateUrl: './why.component.html',
  styleUrl: './why.component.scss'
})
export class WhyComponent implements OnInit {
  whys: WhySection[] = [];
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private whyService: WhyService) {}

  ngOnInit(): void {
    this.whyService.getWhys().subscribe((data) => {
      this.whys = data;
    });
  }

}

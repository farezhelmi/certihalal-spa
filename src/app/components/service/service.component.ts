import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService, ServiceSection } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
// import { NgFor } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  services: ServiceSection[] = [];
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(data => {
      // console.log('Service data:', data);
      this.services = data.filter(s => s.is_active).sort((a, b) => a.order_no - b.order_no);
    });
  }
}

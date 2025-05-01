import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterService, FooterSection } from '../../core/services/footer.service';


@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  footer: FooterSection | null = null;

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.getFooter().subscribe((data) => {
      this.footer = data;
    });
  }
}

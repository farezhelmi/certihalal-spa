import { Component, OnInit } from '@angular/core';
import { AboutService, AboutSection } from '../../core/services/about.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  aboutData: AboutSection[] = [];

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(data => {
      this.aboutData = data.map(item => ({
        ...item,
        image: item.image?.startsWith('http') ? item.image : `http://localhost:8000/${item.image}`
      }));
    });
  }
}

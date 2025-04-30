import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService, HeroSection } from '../../core/services/hero.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  heroData: HeroSection | null = null;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHero().subscribe(data => {
      if (data.length > 0) {
        data[0].background_image = `http://localhost:8000/${data[0].background_image}`; //for image url
        this.heroData = data[0]; // get first hero section
      }
    });
  }
}

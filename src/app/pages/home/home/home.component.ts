import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../../components/hero/hero.component';
import { AboutComponent } from "../../../components/about/about.component";
import { ServiceComponent } from "../../../components/service/service.component";
import { TrainerComponent } from "../../../components/trainer/trainer.component";
import { WhyComponent } from "../../../components/why/why.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroComponent, AboutComponent, ServiceComponent, TrainerComponent, WhyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

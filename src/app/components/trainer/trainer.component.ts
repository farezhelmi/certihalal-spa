import { Component, OnInit } from '@angular/core';
import { TrainerService, TrainerSection } from '../../core/services/trainer.service';
import { NgFor } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-trainer',
  imports: [NgFor],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent implements OnInit {
  trainers: TrainerSection[] = [];
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe((data) => {
      this.trainers = data;
    });
  }
}

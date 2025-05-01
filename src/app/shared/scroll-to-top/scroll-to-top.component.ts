import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <button 
      *ngIf="showScrollButton"
      class="scroll-to-top-btn"
      (click)="scrollToTop()"
      aria-label="Scroll to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--accent-color);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      transition: all 0.3s ease;
    }
    
    .scroll-to-top-btn:hover {
      background-color: var(--secondary-color);
      transform: translateY(-3px);
    }
    
    .scroll-to-top-btn i {
      font-size: 20px;
    }
    
    @media (max-width: 768px) {
      .scroll-to-top-btn {
        width: 40px;
        height: 40px;
        bottom: 20px;
        right: 20px;
      }
      
      .scroll-to-top-btn i {
        font-size: 16px;
      }
    }
  `]
})
export class ScrollToTopComponent implements OnInit {
  showScrollButton = false;
  
  ngOnInit(): void {
    this.checkScrollPosition();
  }
  
  @HostListener('window:scroll', [])
  checkScrollPosition(): void {
    this.showScrollButton = window.pageYOffset > 300;
  }
  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
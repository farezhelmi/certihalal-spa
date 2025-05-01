import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MenuService, MenuItem } from '../../core/services/menu.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // private http = inject(HttpClient);
  menus: MenuItem[] = [];
  // lightLogo = 'http://localhost:8000/storage/logo/logo.png';
  // darkLogo = 'http://localhost:8000/storage/logo/logo2.png';
  lightLogo = `${environment.apiBaseUrl}/storage/logo/logo.png`;
  darkLogo = `${environment.apiBaseUrl}/storage/logo/logo2.png`;
  isScrolled = false;
  isMobileMenuOpen = false;
  isAdminLoggedIn: boolean = false; // Later replace with AuthService logic

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data) => {
      //only active menu, sort b order_no
      this.menus = data.filter(m => m.is_active).sort((a, b) => a.order_no - b.order_no);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // navigateToSection(url: string) {
  //   if (url.startsWith('#')) {
  //     const element = document.querySelector(url);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   } else if (url.includes('#')) {
  //     const [path, fragment] = url.split('#');
  //     this.router.navigate([path], { fragment });
  //   } else {
  //     this.router.navigateByUrl(url);
  //   }
  //   this.isMobileMenuOpen = false;
  // }

  navigateToSection(url: string) {
    const [path, fragment] = url.split('#');
  
    if (!fragment) {
      // No hash, just a regular route
      this.router.navigateByUrl(path);
      this.isMobileMenuOpen = false;
      return;
    }
  
    if (this.router.url.split('#')[0] !== path) {
      // Navigate to the route first (if not already there), then scroll after navigation
      this.router.navigate([path]).then(() => {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Give it a moment to render
      });
    } else {
      // Already on the right page, just scroll
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    this.isMobileMenuOpen = false;
  }
}

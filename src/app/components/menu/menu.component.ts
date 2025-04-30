import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../../core/services/menu.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menus: MenuItem[] = [];
  isMobileMenuOpen = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data) => {
      //only active menu, sort b order_no
      this.menus = data.filter(m => m.is_active).sort((a, b) => a.order_no - b.order_no);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

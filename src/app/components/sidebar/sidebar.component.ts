import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = this.auth.currentUser.pipe(map((user) => !!user));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

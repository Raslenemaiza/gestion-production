import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <div class="d-flex">
      <app-navbar *ngIf="authService.isLoggedIn()"></app-navbar>
      <div [class]="authService.isLoggedIn() ? 'main-content flex-grow-1' : 'w-100'">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
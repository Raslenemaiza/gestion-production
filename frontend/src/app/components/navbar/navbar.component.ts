import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar d-flex flex-column" style="width: 250px; min-width: 250px;">
      <div class="p-3 border-bottom border-secondary">
        <h5 class="mb-0 text-white">
          <i class="bi bi-gear-fill"></i> Production
        </h5>
        <small class="text-muted">Système de gestion</small>
      </div>

      <nav class="flex-grow-1 py-3">
        <a routerLink="/dashboard" routerLinkActive="active">
          📊 Dashboard
        </a>
        <a routerLink="/produits" routerLinkActive="active">
          📦 Produits
        </a>
        <a routerLink="/machines" routerLinkActive="active">
          ⚙️ Machines
        </a>
        <a routerLink="/techniciens" routerLinkActive="active">
          👷 Techniciens
        </a>
        <a routerLink="/ordres" routerLinkActive="active">
          📋 Ordres de fabrication
        </a>
        <a routerLink="/maintenances" routerLinkActive="active">
          🔧 Maintenances
        </a>
      </nav>

      <div class="p-3 border-top border-secondary">
        <small class="text-muted d-block mb-2">{{ authService.getUsername() }}</small>
        <button class="btn btn-sm btn-danger w-100" (click)="logout()">
          Déconnexion
        </button>
      </div>
    </div>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
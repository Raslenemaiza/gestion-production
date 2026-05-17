import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center"
         style="background: linear-gradient(135deg, #2c3e50, #3498db);">
      <div class="card p-4" style="width: 400px;">
        <div class="text-center mb-4">
          <h2>⚙️ Production System</h2>
          <p class="text-muted">Connectez-vous à votre compte</p>
        </div>

        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

        <div class="mb-3">
          <label class="form-label">Nom d'utilisateur</label>
          <input type="text" class="form-control" [(ngModel)]="username"
                 placeholder="Entrez votre username">
        </div>

        <div class="mb-3">
          <label class="form-label">Mot de passe</label>
          <input type="password" class="form-control" [(ngModel)]="password"
                 placeholder="Entrez votre mot de passe">
        </div>

        <button class="btn btn-primary w-100 mb-2" (click)="login()" [disabled]="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <button class="btn btn-outline-secondary w-100" (click)="register()">
          Créer un compte Admin
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        localStorage.setItem('username', res.username);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Identifiants incorrects !';
        this.loading = false;
      }
    });
  }

  register(): void {
    this.loading = true;
    this.error = '';
    this.authService.register(this.username, this.password, 'ADMIN').subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Erreur lors de la création du compte !';
        this.loading = false;
      }
    });
  }
}
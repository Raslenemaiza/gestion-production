import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService, Produit } from '../../services/produit.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Produits</h2>
        <button class="btn btn-primary" (click)="openForm()">+ Nouveau produit</button>
      </div>

      <!-- Recherche -->
      <div class="card mb-3">
        <div class="card-body">
          <input type="text" class="form-control" placeholder="🔍 Rechercher par nom..."
                 [(ngModel)]="searchTerm" (input)="search()">
        </div>
      </div>

      <!-- Formulaire -->
      <div class="card mb-4" *ngIf="showForm">
        <div class="card-body">
          <h5>{{ editMode ? 'Modifier' : 'Nouveau' }} Produit</h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nom</label>
              <input type="text" class="form-control" [(ngModel)]="produit.nom">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Type</label>
              <input type="text" class="form-control" [(ngModel)]="produit.type">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Stock</label>
              <input type="number" class="form-control" [(ngModel)]="produit.stock">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Fournisseur</label>
              <input type="text" class="form-control" [(ngModel)]="produit.fournisseur">
            </div>
          </div>
          <button class="btn btn-success me-2" (click)="save()">Enregistrer</button>
          <button class="btn btn-secondary" (click)="cancel()">Annuler</button>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Type</th>
                <th>Stock</th>
                <th>Fournisseur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of produits">
                <td>{{ p.id }}</td>
                <td>{{ p.nom }}</td>
                <td>{{ p.type }}</td>
                <td>
                  <span [class.text-danger]="p.stock < 10"
                        [class.text-success]="p.stock >= 10">
                    {{ p.stock }}
                  </span>
                </td>
                <td>{{ p.fournisseur }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" (click)="edit(p)">✏️</button>
                  <button class="btn btn-sm btn-danger" (click)="delete(p.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="produits.length === 0">
                <td colspan="6" class="text-center text-muted">Aucun produit trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produit: Produit = { nom: '', type: '', stock: 0, fournisseur: '' };
  showForm = false;
  editMode = false;
  searchTerm = '';

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.findAll().subscribe(data => this.produits = data);
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.produit = { nom: '', type: '', stock: 0, fournisseur: '' };
  }

  edit(p: Produit): void {
    this.produit = { ...p };
    this.showForm = true;
    this.editMode = true;
  }

  save(): void {
    if (this.editMode) {
      this.produitService.update(this.produit.id!, this.produit).subscribe(() => {
        this.loadProduits();
        this.cancel();
      });
    } else {
      this.produitService.save(this.produit).subscribe(() => {
        this.loadProduits();
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.produitService.delete(id).subscribe(() => this.loadProduits());
    }
  }

  cancel(): void {
    this.showForm = false;
    this.editMode = false;
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.produitService.search(this.searchTerm).subscribe(data => this.produits = data);
    } else {
      this.loadProduits();
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdreService, Ordre } from '../../services/ordre.service';
import { ProduitService, Produit } from '../../services/produit.service';
import { MachineService, Machine } from '../../services/machine.service';

@Component({
  selector: 'app-ordres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 Ordres de Fabrication</h2>
        <button class="btn btn-primary" (click)="openForm()">+ Nouvel ordre</button>
      </div>

      <!-- Formulaire -->
      <div class="card mb-4" *ngIf="showForm">
        <div class="card-body">
          <h5>{{ editMode ? 'Modifier' : 'Nouvel' }} Ordre</h5>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label class="form-label">Produit</label>
              <select class="form-select" [(ngModel)]="selectedProduitId">
                <option *ngFor="let p of produits" [value]="p.id">{{ p.nom }}</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Quantité</label>
              <input type="number" class="form-control" [(ngModel)]="ordre.quantite">
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" [(ngModel)]="ordre.date">
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Machine</label>
              <select class="form-select" [(ngModel)]="selectedMachineId">
                <option [value]="null">-- Aucune --</option>
                <option *ngFor="let m of machines" [value]="m.id">{{ m.nom }}</option>
              </select>
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
                <th>Produit</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Machine</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let o of ordres">
                <td>{{ o.id }}</td>
                <td>{{ o.produit?.nom }}</td>
                <td>{{ o.quantite }}</td>
                <td>{{ o.date }}</td>
                <td>{{ o.machine?.nom || '-' }}</td>
                <td>
                  <span class="badge"
                    [class.bg-warning]="o.statut === 'EN_ATTENTE'"
                    [class.bg-primary]="o.statut === 'EN_COURS'"
                    [class.bg-success]="o.statut === 'TERMINE'"
                    [class.bg-danger]="o.statut === 'ANNULE'">
                    {{ o.statut }}
                  </span>
                </td>
                <td>
                  <select class="form-select form-select-sm d-inline w-auto me-1"
                          (change)="changerStatut(o.id!, $event)">
                    <option value="">Changer statut</option>
                    <option value="EN_ATTENTE">EN_ATTENTE</option>
                    <option value="EN_COURS">EN_COURS</option>
                    <option value="TERMINE">TERMINE</option>
                    <option value="ANNULE">ANNULE</option>
                  </select>
                  <button class="btn btn-sm btn-warning me-1" (click)="edit(o)">✏️</button>
                  <button class="btn btn-sm btn-danger" (click)="delete(o.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="ordres.length === 0">
                <td colspan="7" class="text-center text-muted">Aucun ordre trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class OrdresComponent implements OnInit {
  ordres: Ordre[] = [];
  produits: Produit[] = [];
  machines: Machine[] = [];
  ordre: Ordre = { produit: null, quantite: 1, date: '', statut: 'EN_ATTENTE' };
  selectedProduitId: number | null = null;
  selectedMachineId: number | null = null;
  showForm = false;
  editMode = false;

  constructor(
    private ordreService: OrdreService,
    private produitService: ProduitService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.loadOrdres();
    this.produitService.findAll().subscribe(data => this.produits = data);
    this.machineService.findAll().subscribe(data => this.machines = data);
  }

  loadOrdres(): void {
    this.ordreService.findAll().subscribe(data => this.ordres = data);
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.ordre = { produit: null, quantite: 1, date: '', statut: 'EN_ATTENTE' };
    this.selectedProduitId = null;
    this.selectedMachineId = null;
  }

  edit(o: Ordre): void {
    this.ordre = { ...o };
    this.selectedProduitId = o.produit?.id || null;
    this.selectedMachineId = o.machine?.id || null;
    this.showForm = true;
    this.editMode = true;
  }

  save(): void {
    const produit = this.produits.find(p => p.id === +this.selectedProduitId!);
    const machine = this.selectedMachineId
      ? this.machines.find(m => m.id === +this.selectedMachineId!)
      : null;

    const toSave: Ordre = {
      ...this.ordre,
      produit: produit,
      machine: machine || null
    };

    if (this.editMode) {
      this.ordreService.update(this.ordre.id!, toSave).subscribe(() => {
        this.loadOrdres();
        this.cancel();
      });
    } else {
      this.ordreService.save(toSave).subscribe(() => {
        this.loadOrdres();
        this.cancel();
      });
    }
  }

  changerStatut(id: number, event: Event): void {
    const statut = (event.target as HTMLSelectElement).value;
    if (statut) {
      this.ordreService.changerStatut(id, statut).subscribe(() => this.loadOrdres());
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer cet ordre ?')) {
      this.ordreService.delete(id).subscribe(() => this.loadOrdres());
    }
  }

  cancel(): void {
    this.showForm = false;
    this.editMode = false;
  }
}
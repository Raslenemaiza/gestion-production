import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TechnicienService, Technicien } from '../../services/technicien.service';
import { MachineService, Machine } from '../../services/machine.service';

@Component({
  selector: 'app-techniciens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>👷 Techniciens</h2>
        <button class="btn btn-primary" (click)="openForm()">+ Nouveau technicien</button>
      </div>

      <!-- Formulaire -->
      <div class="card mb-4" *ngIf="showForm">
        <div class="card-body">
          <h5>{{ editMode ? 'Modifier' : 'Nouveau' }} Technicien</h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label class="form-label">Nom</label>
              <input type="text" class="form-control" [(ngModel)]="technicien.nom">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">Compétences</label>
              <input type="text" class="form-control" [(ngModel)]="technicien.competences">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">Machine assignée</label>
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
                <th>Nom</th>
                <th>Compétences</th>
                <th>Machine assignée</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of techniciens">
                <td>{{ t.id }}</td>
                <td>{{ t.nom }}</td>
                <td>{{ t.competences }}</td>
                <td>{{ t.machineAssignee?.nom || '-' }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" (click)="edit(t)">✏️</button>
                  <button class="btn btn-sm btn-danger" (click)="delete(t.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="techniciens.length === 0">
                <td colspan="5" class="text-center text-muted">Aucun technicien trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TechniciensComponent implements OnInit {
  techniciens: Technicien[] = [];
  machines: Machine[] = [];
  technicien: Technicien = { nom: '', competences: '' };
  selectedMachineId: number | null = null;
  showForm = false;
  editMode = false;

  constructor(
    private technicienService: TechnicienService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.loadTechniciens();
    this.machineService.findAll().subscribe(data => this.machines = data);
  }

  loadTechniciens(): void {
    this.technicienService.findAll().subscribe(data => this.techniciens = data);
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.technicien = { nom: '', competences: '' };
    this.selectedMachineId = null;
  }

  edit(t: Technicien): void {
    this.technicien = { ...t };
    this.selectedMachineId = t.machineAssignee?.id || null;
    this.showForm = true;
    this.editMode = true;
  }

  save(): void {
    const machine = this.selectedMachineId
      ? this.machines.find(m => m.id === +this.selectedMachineId!)
      : null;

    const toSave: Technicien = {
      ...this.technicien,
      machineAssignee: machine || null
    };

    if (this.editMode) {
      this.technicienService.update(this.technicien.id!, toSave).subscribe(() => {
        this.loadTechniciens();
        this.cancel();
      });
    } else {
      this.technicienService.save(toSave).subscribe(() => {
        this.loadTechniciens();
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer ce technicien ?')) {
      this.technicienService.delete(id).subscribe(() => this.loadTechniciens());
    }
  }

  cancel(): void {
    this.showForm = false;
    this.editMode = false;
  }
}
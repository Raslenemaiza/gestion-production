import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceService, Maintenance } from '../../services/maintenance.service';
import { MachineService, Machine } from '../../services/machine.service';
import { TechnicienService, Technicien } from '../../services/technicien.service';

@Component({
  selector: 'app-maintenances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>🔧 Maintenances</h2>
        <button class="btn btn-primary" (click)="openForm()">+ Nouvelle maintenance</button>
      </div>

      <!-- Formulaire -->
      <div class="card mb-4" *ngIf="showForm">
        <div class="card-body">
          <h5>{{ editMode ? 'Modifier' : 'Nouvelle' }} Maintenance</h5>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label class="form-label">Machine</label>
              <select class="form-select" [(ngModel)]="selectedMachineId">
                <option *ngFor="let m of machines" [value]="m.id">{{ m.nom }}</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Technicien</label>
              <select class="form-select" [(ngModel)]="selectedTechnicienId">
                <option *ngFor="let t of techniciens" [value]="t.id">{{ t.nom }}</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" [(ngModel)]="maintenance.date">
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Type</label>
              <select class="form-select" [(ngModel)]="maintenance.type">
                <option value="PREVENTIVE">Préventive</option>
                <option value="CORRECTIVE">Corrective</option>
                <option value="URGENCE">Urgence</option>
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
                <th>Machine</th>
                <th>Technicien</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of maintenances">
                <td>{{ m.id }}</td>
                <td>{{ m.machine?.nom }}</td>
                <td>{{ m.technicien?.nom }}</td>
                <td>{{ m.date }}</td>
                <td>
                  <span class="badge"
                    [class.bg-success]="m.type === 'PREVENTIVE'"
                    [class.bg-warning]="m.type === 'CORRECTIVE'"
                    [class.bg-danger]="m.type === 'URGENCE'">
                    {{ m.type }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" (click)="edit(m)">✏️</button>
                  <button class="btn btn-sm btn-danger" (click)="delete(m.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="maintenances.length === 0">
                <td colspan="6" class="text-center text-muted">Aucune maintenance trouvée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class MaintenancesComponent implements OnInit {
  maintenances: Maintenance[] = [];
  machines: Machine[] = [];
  techniciens: Technicien[] = [];
  maintenance: Maintenance = { machine: null, technicien: null, date: '', type: 'PREVENTIVE' };
  selectedMachineId: number | null = null;
  selectedTechnicienId: number | null = null;
  showForm = false;
  editMode = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private machineService: MachineService,
    private technicienService: TechnicienService
  ) {}

  ngOnInit(): void {
    this.loadMaintenances();
    this.machineService.findAll().subscribe(data => this.machines = data);
    this.technicienService.findAll().subscribe(data => this.techniciens = data);
  }

  loadMaintenances(): void {
    this.maintenanceService.findAll().subscribe(data => this.maintenances = data);
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.maintenance = { machine: null, technicien: null, date: '', type: 'PREVENTIVE' };
    this.selectedMachineId = null;
    this.selectedTechnicienId = null;
  }

  edit(m: Maintenance): void {
    this.maintenance = { ...m };
    this.selectedMachineId = m.machine?.id || null;
    this.selectedTechnicienId = m.technicien?.id || null;
    this.showForm = true;
    this.editMode = true;
  }

  save(): void {
    const machine = this.machines.find(m => m.id === +this.selectedMachineId!);
    const technicien = this.techniciens.find(t => t.id === +this.selectedTechnicienId!);

    const toSave: Maintenance = {
      ...this.maintenance,
      machine: machine,
      technicien: technicien
    };

    if (this.editMode) {
      this.maintenanceService.update(this.maintenance.id!, toSave).subscribe(() => {
        this.loadMaintenances();
        this.cancel();
      });
    } else {
      this.maintenanceService.save(toSave).subscribe(() => {
        this.loadMaintenances();
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer cette maintenance ?')) {
      this.maintenanceService.delete(id).subscribe(() => this.loadMaintenances());
    }
  }

  cancel(): void {
    this.showForm = false;
    this.editMode = false;
  }
}
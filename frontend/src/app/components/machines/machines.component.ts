import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MachineService, Machine } from '../../services/machine.service';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>⚙️ Machines</h2>
        <button class="btn btn-primary" (click)="openForm()">+ Nouvelle machine</button>
      </div>

      <!-- Formulaire -->
      <div class="card mb-4" *ngIf="showForm">
        <div class="card-body">
          <h5>{{ editMode ? 'Modifier' : 'Nouvelle' }} Machine</h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label class="form-label">Nom</label>
              <input type="text" class="form-control" [(ngModel)]="machine.nom">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">État</label>
              <select class="form-select" [(ngModel)]="machine.etat">
                <option value="EN_SERVICE">En service</option>
                <option value="EN_PANNE">En panne</option>
                <option value="EN_MAINTENANCE">En maintenance</option>
                <option value="ARRETEE">Arrêtée</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">Prochaine maintenance</label>
              <input type="date" class="form-control" [(ngModel)]="machine.maintenanceProchaine">
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
                <th>État</th>
                <th>Prochaine maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of machines">
                <td>{{ m.id }}</td>
                <td>{{ m.nom }}</td>
                <td>
                  <span class="badge"
                    [class.bg-success]="m.etat === 'EN_SERVICE'"
                    [class.bg-danger]="m.etat === 'EN_PANNE'"
                    [class.bg-warning]="m.etat === 'EN_MAINTENANCE'"
                    [class.bg-secondary]="m.etat === 'ARRETEE'">
                    {{ m.etat }}
                  </span>
                </td>
                <td>{{ m.maintenanceProchaine || '-' }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" (click)="edit(m)">✏️</button>
                  <button class="btn btn-sm btn-danger" (click)="delete(m.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="machines.length === 0">
                <td colspan="5" class="text-center text-muted">Aucune machine trouvée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class MachinesComponent implements OnInit {
  machines: Machine[] = [];
  machine: Machine = { nom: '', etat: 'EN_SERVICE' };
  showForm = false;
  editMode = false;

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.machineService.findAll().subscribe(data => this.machines = data);
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.machine = { nom: '', etat: 'EN_SERVICE' };
  }

  edit(m: Machine): void {
    this.machine = { ...m };
    this.showForm = true;
    this.editMode = true;
  }

  save(): void {
    if (this.editMode) {
      this.machineService.update(this.machine.id!, this.machine).subscribe(() => {
        this.loadMachines();
        this.cancel();
      });
    } else {
      this.machineService.save(this.machine).subscribe(() => {
        this.loadMachines();
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer cette machine ?')) {
      this.machineService.delete(id).subscribe(() => this.loadMachines());
    }
  }

  cancel(): void {
    this.showForm = false;
    this.editMode = false;
  }
}
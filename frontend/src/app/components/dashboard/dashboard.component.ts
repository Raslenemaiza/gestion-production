import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { MachineService } from '../../services/machine.service';
import { OrdreService } from '../../services/ordre.service';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="mb-4">📊 Dashboard</h2>

      <!-- Statistiques -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card stat-card blue">
            <h3 class="text-primary">{{ totalProduits }}</h3>
            <p class="text-muted mb-0">📦 Produits</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card stat-card green">
            <h3 class="text-success">{{ totalMachines }}</h3>
            <p class="text-muted mb-0">⚙️ Machines</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card stat-card orange">
            <h3 class="text-warning">{{ totalOrdres }}</h3>
            <p class="text-muted mb-0">📋 Ordres</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card stat-card red">
            <h3 class="text-danger">{{ totalMaintenances }}</h3>
            <p class="text-muted mb-0">🔧 Maintenances</p>
          </div>
        </div>
      </div>

      <!-- Ordres récents -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">📋 Ordres de fabrication récents</h5>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ordre of ordres">
                <td>{{ ordre.id }}</td>
                <td>{{ ordre.produit?.nom }}</td>
                <td>{{ ordre.quantite }}</td>
                <td>{{ ordre.date }}</td>
                <td>
                  <span class="badge"
                    [class.bg-warning]="ordre.statut === 'EN_ATTENTE'"
                    [class.bg-primary]="ordre.statut === 'EN_COURS'"
                    [class.bg-success]="ordre.statut === 'TERMINE'"
                    [class.bg-danger]="ordre.statut === 'ANNULE'">
                    {{ ordre.statut }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  totalProduits = 0;
  totalMachines = 0;
  totalOrdres = 0;
  totalMaintenances = 0;
  ordres: any[] = [];

  constructor(
    private produitService: ProduitService,
    private machineService: MachineService,
    private ordreService: OrdreService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    this.produitService.findAll().subscribe(d => this.totalProduits = d.length);
    this.machineService.findAll().subscribe(d => this.totalMachines = d.length);
    this.maintenanceService.findAll().subscribe(d => this.totalMaintenances = d.length);
    this.ordreService.findAll().subscribe(d => {
      this.totalOrdres = d.length;
      this.ordres = d.slice(0, 5);
    });
  }
}
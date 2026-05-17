import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { MachinesComponent } from './components/machines/machines.component';
import { TechniciensComponent } from './components/techniciens/techniciens.component';
import { OrdresComponent } from './components/ordres/ordres.component';
import { MaintenancesComponent } from './components/maintenances/maintenances.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'machines', component: MachinesComponent },
  { path: 'techniciens', component: TechniciensComponent },
  { path: 'ordres', component: OrdresComponent },
  { path: 'maintenances', component: MaintenancesComponent }
];
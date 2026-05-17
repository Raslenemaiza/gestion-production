import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Maintenance {
  id?: number;
  machine: any;
  technicien: any;
  date: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class MaintenanceService {

  private apiUrl = `${environment.apiUrl}/maintenances`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Maintenance[]> { return this.http.get<Maintenance[]>(this.apiUrl); }
  save(maintenance: Maintenance): Observable<Maintenance> { return this.http.post<Maintenance>(this.apiUrl, maintenance); }
  update(id: number, maintenance: Maintenance): Observable<Maintenance> { return this.http.put<Maintenance>(`${this.apiUrl}/${id}`, maintenance); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
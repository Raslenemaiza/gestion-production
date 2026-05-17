import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Machine {
  id?: number;
  nom: string;
  etat: string;
  maintenanceProchaine?: string;
}

@Injectable({ providedIn: 'root' })
export class MachineService {

  private apiUrl = `${environment.apiUrl}/machines`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Machine[]> { return this.http.get<Machine[]>(this.apiUrl); }
  findById(id: number): Observable<Machine> { return this.http.get<Machine>(`${this.apiUrl}/${id}`); }
  save(machine: Machine): Observable<Machine> { return this.http.post<Machine>(this.apiUrl, machine); }
  update(id: number, machine: Machine): Observable<Machine> { return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
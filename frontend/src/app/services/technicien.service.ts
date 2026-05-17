import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Technicien {
  id?: number;
  nom: string;
  competences: string;
  machineAssignee?: any;
}

@Injectable({ providedIn: 'root' })
export class TechnicienService {

  private apiUrl = `${environment.apiUrl}/techniciens`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Technicien[]> { return this.http.get<Technicien[]>(this.apiUrl); }
  save(technicien: Technicien): Observable<Technicien> { return this.http.post<Technicien>(this.apiUrl, technicien); }
  update(id: number, technicien: Technicien): Observable<Technicien> { return this.http.put<Technicien>(`${this.apiUrl}/${id}`, technicien); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Ordre {
  id?: number;
  produit: any;
  quantite: number;
  date: string;
  machine?: any;
  statut: string;
}

@Injectable({ providedIn: 'root' })
export class OrdreService {

  private apiUrl = `${environment.apiUrl}/ordres`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Ordre[]> { return this.http.get<Ordre[]>(this.apiUrl); }
  save(ordre: Ordre): Observable<Ordre> { return this.http.post<Ordre>(this.apiUrl, ordre); }
  update(id: number, ordre: Ordre): Observable<Ordre> { return this.http.put<Ordre>(`${this.apiUrl}/${id}`, ordre); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  changerStatut(id: number, statut: string): Observable<Ordre> { return this.http.patch<Ordre>(`${this.apiUrl}/${id}/statut?statut=${statut}`, {}); }
}
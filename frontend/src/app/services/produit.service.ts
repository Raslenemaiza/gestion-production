import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Produit {
  id?: number;
  nom: string;
  type: string;
  stock: number;
  fournisseur: string;
}

@Injectable({ providedIn: 'root' })
export class ProduitService {

  private apiUrl = `${environment.apiUrl}/produits`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Produit[]> { return this.http.get<Produit[]>(this.apiUrl); }
  findById(id: number): Observable<Produit> { return this.http.get<Produit>(`${this.apiUrl}/${id}`); }
  save(produit: Produit): Observable<Produit> { return this.http.post<Produit>(this.apiUrl, produit); }
  update(id: number, produit: Produit): Observable<Produit> { return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  search(nom: string): Observable<Produit[]> { return this.http.get<Produit[]>(`${this.apiUrl}/search?nom=${nom}`); }
}
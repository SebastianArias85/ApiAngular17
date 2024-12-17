import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private apiUrl = 'http://localhost/api/api.php';

  constructor(private http: HttpClient) { }

  // Obtener artículos
  getArticulos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Agregar un artículo
  addArticulo(articulo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, articulo);
  }

  // Actualizar un artículo
  updateArticulo(articulo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, articulo);
  }

  // Eliminar un artículo
  deleteArticulo(codigo: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?codigo=${codigo}`);
  }
}
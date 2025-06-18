import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../interfaces/contrato';
import { adaptarContrato } from '../shared/adapters/contrato.adapter';

@Injectable({
  providedIn: 'root', // Torna o serviço disponível globalmente
})
export class ServiceContratos {

  private URL = 'http://localhost:8080/api/contratos';

  constructor(private http: HttpClient) {

  }

  findById(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.URL}/${id}`).pipe(
       map(adaptarContrato)
    );
  }

  listarContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.URL).pipe(
      map(dados => dados.map(adaptarContrato))
    )
  }

  cadastrarContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(this.URL, contrato);
  }
  
  atualizarContrato(id: Number, contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(`${this.URL}/${id}`, contrato);
  }
  
  removerContrato(id: Number): Observable<Contrato> {
    return this.http.delete<Contrato>(`${this.URL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Contrato } from '../model/Contrato';
import { Aluno } from '../model/Alunos';
import { Responsavel } from '../model/Responsavel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Torna o serviço disponível globalmente
})
export class ServiceContratos {

  private URL = 'api/contratos';

  constructor(private http: HttpClient) {

  }

  findById(id: Number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.URL}/${id}`);
  }

  listarContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.URL);
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

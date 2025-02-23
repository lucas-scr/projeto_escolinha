
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})


export class ServiceAlunos {

    private url = 'api/alunos'

    private listaAlunos: Aluno[] =  [];

    constructor (private http: HttpClient){
        
    }

    obterAlunos(): Observable<Aluno[]>{
        return this.http.get<Aluno[]>(this.url);
    }


    adicionarAlunoNaLista(aluno: Aluno):Observable<Aluno>{
        return this.http.post<Aluno>(this.url, aluno)
    }
    

    removerAlunoDaLista(id: Number){
     const index = this.listaAlunos.findIndex(alunoLista => alunoLista.id === id)

     if(index !== -1) {
        this.listaAlunos.splice(index, 1);
     }
    }
 


    atualizarAlunoNalista(id: number, aluno: Aluno):Observable<Aluno>{
       return this.http.put<Aluno>(`${this.url}/${id}`, aluno)
    }

    findById(id: Number): Observable<Aluno>{
        return this.http.get<Aluno>(`${this.url}/${id}`)
    }
}

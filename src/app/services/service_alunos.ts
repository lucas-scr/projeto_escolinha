
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';
import { HttpClient } from '@angular/common/http';
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

    adicionarAlunosNalista(aluno: Aluno){
        aluno.idade = this.calcularIdade(aluno.dataNascimento);
        aluno.id = this.capturarUltimoId(this.listaAlunos);
        this.listaAlunos.push(aluno);
    }

    removerAlunoDaLista(id: Number){
     const index = this.listaAlunos.findIndex(alunoLista => alunoLista.id === id)

     if(index !== -1) {
        this.listaAlunos.splice(index, 1);
     }
    }

    listarAlunos(): Aluno []{
        return this.listaAlunos;
    }   

    calcularIdade(dataNascimento: Date): Number{
        const data = new Date();
        let idade = data.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = data.getMonth();
        const mesNascimento = dataNascimento.getMonth();

        if(mesAtual < mesNascimento || (mesAtual === mesNascimento && data.getDate() < data.getDate())){
            idade--;
        }
        return idade;
    }

    capturarUltimoId(lista: Aluno[]): Number{
        const ultimoId = lista.length + 1;
        return ultimoId;
    }

    AtualizarAlunoNalista(aluno: Aluno){
        this.listaAlunos = this.listaAlunos.map(item => {
            if(item.id = aluno.id){
              return  item = aluno;
            } else{
                return item;
            }

         } );
    }

    findBydId(id: Number): Aluno{
        const alunoEncontrado = this.listaAlunos.find(item => item.id == id);
        return alunoEncontrado;
    }
}

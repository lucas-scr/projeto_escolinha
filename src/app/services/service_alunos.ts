
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})


export class ServiceAlunos {

    private listaAlunos: Aluno[] =  [];

    constructor (){
        this.listaAlunos = [
            new Aluno("Carlim", 8, new Date ("2000-05-02"), false),
            new Aluno("Joao", 10, new Date ("2001-08-04"), true),
            new Aluno("Maria", 11, new Date ("1999-10-02"), false),
            new Aluno ("Aninha", 8, new Date ("1999-10-28"), false)
        ]

        this.listaAlunos[0].dias = ["Segunda", "Terça"];
        this.listaAlunos[1].dias = ["Terça"];
        this.listaAlunos[2].dias = ["Segunda", "Sexta"];
        this.listaAlunos[3].dias = ["Segunda", "Sexta"];


    
        console.log(this.listaAlunos)

    }

    adicionarAlunosNalista(aluno: Aluno){
        this.listaAlunos.push(aluno);
    }

    removerAlunoDaLista(aluno: Aluno){
     const index = this.listaAlunos.findIndex(alunoLista => alunoLista === aluno)

     if(index !== -1) {
        this.listaAlunos.splice(index, 1);
     }
    }

    listarAlunos(): Aluno []{
        return this.listaAlunos;
    }   
}

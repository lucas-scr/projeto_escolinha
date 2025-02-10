
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})


export class ServiceAlunos {

    private listaAlunos: Aluno[] =  [];

    constructor (){
        this.listaAlunos = [
            new Aluno("Carlim", 8, new Date ("2000-05-02"), false, "M"),
            new Aluno("Joao", 10, new Date ("2001-08-04"), true, "M" ),
            new Aluno("Maria", 11, new Date ("1999-10-02"), false, "F"),
            new Aluno ("Aninha", 8, new Date ("1999-10-28"), false, "F"),
            new Aluno("Lucas Silva", 10, new Date("2014-05-12"), true, "M"),
            new Aluno("Mariana Souza", 8, new Date("2016-09-23"), false, "F"),
            new Aluno("Rafael Oliveira", 7, new Date("2017-11-05"), true, "M"),
            new Aluno("Isabela Mendes", 9, new Date("2015-07-19"), false, "F"),
            new Aluno("Pedro Ferreira", 6, new Date("2018-02-28"), true, "M"),
            new Aluno("Pedro Teixeira", 6, new Date("2018-02-28"), true, "M")
        ]

        this.listaAlunos[0].dias = ["Segunda", "Terça"];
        this.listaAlunos[1].dias = ["Terça"];
        this.listaAlunos[2].dias = ["Segunda", "Sexta"];
        this.listaAlunos[3].dias = ["Segunda", "Sexta"];
        this.listaAlunos[4].dias = ["Segunda", "Sexta"];
        this.listaAlunos[5].dias = ["Segunda", "Sexta"];
        this.listaAlunos[6].dias = ["Segunda", "Sexta"];
        this.listaAlunos[7].dias = ["Segunda", "Sexta"];
        this.listaAlunos[8].dias = ["Segunda", "Sexta"];
        this.listaAlunos[9].dias = ["Segunda", "quarta"];
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

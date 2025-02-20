
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})


export class ServiceAlunos {

    private listaAlunos: Aluno[] =  [];

    constructor (){
        this.listaAlunos = [
            new Aluno("Carlim", new Date ("2000-05-02"), "M"),
            new Aluno("Joao",  new Date ("2001-08-04"),  "M" ),
            new Aluno("Maria",  new Date ("1999-10-02"),  "F"),
            new Aluno ("Aninha", new Date ("1999-10-28"),  "F"),
            new Aluno("Lucas Silva",  new Date("2014-05-12"),  "M"),
            new Aluno("Mariana Souza",  new Date("2016-09-23"),  "F"),
            new Aluno("Rafael Oliveira", new Date("2017-11-05"),  "M"),
            new Aluno("Isabela Mendes",  new Date("2015-07-19"),  "F"),
            new Aluno("Pedro Ferreira", new Date("2018-02-28"),  "M"),
            new Aluno("Pedro Teixeira", new Date("2018-02-28"),  "M")
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
        this.listaAlunos[0].idade = 8;
        this.listaAlunos[1].idade = 8;
        this.listaAlunos[2].idade = 8;
        this.listaAlunos[3].idade = 8;
        this.listaAlunos[4].idade = 8;
        this.listaAlunos[5].idade = 8;
        this.listaAlunos[6].idade = 8;
        this.listaAlunos[7].idade = 8;
        this.listaAlunos[8].idade = 8;
        this.listaAlunos[9].idade = 8;

        this.listaAlunos[0].id = 1;
        this.listaAlunos[1].id = 2;
        this.listaAlunos[2].id = 3;
        this.listaAlunos[3].id = 4;
        this.listaAlunos[4].id = 5;
        this.listaAlunos[5].id = 6;
        this.listaAlunos[6].id = 7;
        this.listaAlunos[7].id = 8;
        this.listaAlunos[8].id = 9;
        this.listaAlunos[9].id = 10;
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

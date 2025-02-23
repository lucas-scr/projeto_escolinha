import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../model/Alunos';

@Injectable({
    providedIn: 'root',
  })

  export class MockDbAlunosService implements InMemoryDbService{
    createDb(){
        const alunos = [
                        new Aluno('Joao',  new Date ('2001-08-04'),  'M', true, ['Segunda', 'Terça'], 1, "J" ),
                        new Aluno('Maria',  new Date ('1999-10-02'),  'F', false, ['Segunda', 'Quarta'], 2, "M"),
                        new Aluno ('Aninha', new Date ('1999-10-28'),  'F', true, ['Sexta'], 3, "A"),
                        new Aluno('Lucas Silva',  new Date('2014-05-12'),  'M', true, ['Segunda', 'Terça'], 4, "LS"),
                        new Aluno('Mariana Souza',  new Date('2016-09-23'),  'F', true, ['Quarta', 'Quinta'], 5, "MS"),
        ]; 


        
        alunos[0].idade = 8;
        alunos[1].idade = 8;
        alunos[2].idade = 8;
        alunos[3].idade = 8;
        alunos[4].idade = 8;


        return {alunos}
    }
  }

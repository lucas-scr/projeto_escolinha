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
                        new Aluno("Joao",  new Date ('2001-08-04'),  'M', true, ['Segunda", "Terça'] ),
                        new Aluno("Maria",  new Date ('1999-10-02'),  'F', false, ['Segunda', 'Quarta']),
                        new Aluno ('Aninha', new Date ('1999-10-28'),  'F', true, ['Sexta']),
                        new Aluno('Lucas Silva',  new Date('2014-05-12'),  'M', true, ['Segunda', 'Terça']),
                        new Aluno('Mariana Souza',  new Date('2016-09-23'),  'F', true, ['Quarta', 'Quinta']),
        ];
        return {alunos}
    }
  }

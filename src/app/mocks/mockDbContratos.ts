import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';
import { Contrato } from '../model/Contrato';
import { Responsavel } from '../model/Responsavel';

@Injectable({
  providedIn: 'root',
})
export class MockDbContratosService implements InMemoryDbService {
  createDb() {
    const contratos = [
      new Contrato(
        new Responsavel('Responsável 2', '12345678901', 1234567890),
        [new Aluno('Carlim', new Date('2000-05-02'), 'M')],
        new Date('2024-03-01'),
        500,
        new Date('2024-02-28'),
        ['Segunda'],
        1

      ),
      new Contrato(
        new Responsavel('Responsável 2', '12345678902', 1234567890),
        [
          new Aluno('Joao', new Date('2001-08-04'), 'M'),
          new Aluno('Carlim', new Date('2000-05-02'), 'M'),
          new Aluno('Maria', new Date('1999-10-02'), 'F'),
        ],
        new Date('2024-04-01'),
        400,
        new Date('2024-03-31'),
        ['Terça', 'Quinta'],
        2

      ),
      new Contrato(
        new Responsavel('Responsável 3', '12345678903', 1234567890),
        [new Aluno('Maria', new Date('1999-10-02'), 'F')],
        new Date('2024-05-01'),
        600,
        new Date('2024-04-30'),
        ['Segunda', 'Quarta', 'Sexta'],
        3
      ),
      new Contrato(
        new Responsavel('Responsável 4', '12345678904', 1234567890),
        [new Aluno('Aninha', new Date('1999-10-28'), 'F')],
        new Date('2024-06-01'),
        450,
        new Date('2024-05-31'),
        ['Terça', 'Quinta'],
        4

      ),
      new Contrato(
        new Responsavel('Responsável 5', '12345678905', 1234567890),
        [
          new Aluno('Lucas Silva', new Date('2014-05-12'), 'M'),
          new Aluno('Joao', new Date('2001-08-04'), 'M'),
        ],
        new Date('2024-07-01'),
        550,
        new Date('2024-06-30'),
        ['Segunda', 'Quarta'],
        5

      ),
      new Contrato(
        new Responsavel('Responsável 6', '12345678906', 1234567890),
        [new Aluno('Mariana Souza', new Date('2016-09-23'), 'F')],
        new Date('2024-08-01'),        500,
        new Date('2024-07-31'),
        ['Segunda', 'Quarta', 'Sexta'],
        6
      ),
    ];

    return { contratos };
  }
}

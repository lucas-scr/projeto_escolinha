import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Aluno } from '../model/Alunos';
import { Contrato } from '../model/Contrato';
import { Responsavel } from '../model/Responsavel';
import { Atividade } from '../interfaces/atividades';
import { Materia } from '../interfaces/materias';

@Injectable({
    providedIn: 'root',
  })

  export class MockDbService implements InMemoryDbService{
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




         const contratos = [
              new Contrato(
                new Responsavel('Responsável 2', '12345678901', 12345667111),
                new Aluno('Joao',  new Date ('2001-08-04'),  'M', true, ['Segunda'], 1, "J" ),
                new Date('2024-03-01'),
                500,
                20,
                true,
                ['Segunda'],
                1
        
              ),
              new Contrato(
                new Responsavel('Responsável 2', '12345678902', 12345667111),
                new Aluno('Lucas Silva',  new Date('2014-05-12'),  'M', true, ['Terça', 'Quinta'], 4, "LS"),
                new Date('2024-04-01'),
                400,
                12,
                true,
                ['Terça', 'Quinta'],
                2
        
              ),
              new Contrato(
                new Responsavel('Responsável 3', '12345678903', 12345667111),
                new Aluno('Lucas Silva',  new Date('2014-05-12'),  'M', true, ['Segunda', 'Quarta', 'Sexta'], 4, "LS"),
                new Date('2024-05-01'),
                600,
               23,
                true,
                ['Segunda', 'Quarta', 'Sexta'],
                3
              ),
              new Contrato(
                new Responsavel('Responsável 4', '12345678904', 12345667111),
                new Aluno('Mariana Souza',  new Date('2016-09-23'),  'F', true,  ['Terça', 'Quinta'], 5, "MS"),
                new Date('2024-06-01'),
                450,
                2,
                false,
                ['Terça', 'Quinta'],
                4
        
              ),
              new Contrato(
                new Responsavel('Responsável 5', '12345678905', 12345667111),
                new Aluno('Lucas Silva',  new Date('2014-05-12'),  'M', true, ['Segunda', 'Quarta'], 4, "LS")   ,
                new Date('2024-07-01'),
                550,
                17,
                false,
                ['Segunda', 'Quarta'],
                5
        
              ),
              new Contrato(
                new Responsavel('Responsável 6', '12345678906', 12345667111),
                new Aluno ('Aninha', new Date ('1999-10-28'),  'F', true, ['Segunda', 'Quarta', 'Sexta'], 3, "A"),
                new Date('2024-08-01'),        500,
                25,
                true,
                ['Segunda', 'Quarta', 'Sexta'],
                6
              ),
            ];

            const atividades: Atividade[] = [
              { id: 1,
                codigo: "Materia01",
                materia: 5,
                nomeMateria: 'Ciências',
                nomeArquivo: 'arquivo1.png',
                arquivo: new Blob(['Português: Análise sintática'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-15T09:00:00')
              },
              { 
                id: 2,
                codigo: "Materia02",
                materia: 2,
                nomeMateria: 'Matemática',
                nomeArquivo: 'arquivo1.png',
                arquivo: new Blob(['Matemática: Cálculo de limites'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-16T10:00:00')
              },
              { 
                id: 3,
                codigo: "Materia03",
                materia: 4,
                nomeMateria: 'Geografia',
                nomeArquivo: 'arquivo.123',
                arquivo: new Blob(['História: Idade Média'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-17T11:30:00')
              },
              { 
                id: 4,
                codigo: "Materia04",
                materia: 3,
                nomeMateria: 'História',
                nomeArquivo: 'arquivo.113',
                arquivo: new Blob(['Geografia: Cartografia e mapas'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-18T14:45:00')
              },
              { 
                id: 5,
                codigo: "Materia05",
                materia: 2,
                nomeArquivo: 'arquivo.124',
                nomeMateria: 'Matemática',
                arquivo: new Blob(['Ciências: Ecossistemas'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-19T08:20:00')
              },
              { 
                id: 6,
                codigo: "Materia06",
                materia: 1,
                nomeMateria: 'Português',
                nomeArquivo: 'arquivo.123',
                arquivo: new Blob(['Física: Leis de Newton'], { type: 'text/plain' }),
                dataCriacao: new Date('2025-02-20T15:00:00')
              }
            ];

            const materias: Materia [] = [
     
                { id: 1, nome: 'Português' },
                { id: 2, nome: 'Matemática' },
                { id: 3, nome: 'História' },
                { id: 4, nome: 'Geografia' },
                { id: 5, nome: 'Ciências' },
                { id: 6, nome: 'Física' }
            ]

        return {alunos, contratos, atividades, materias}
    }

  }

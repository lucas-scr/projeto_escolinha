import { Injectable } from '@angular/core';
import { Contrato } from '../model/Contrato';
import { Aluno } from '../model/Alunos';
import { Responsavel } from '../model/Responsavel';

@Injectable({
  providedIn: 'root', // Torna o serviço disponível globalmente
})
export class ServiceContratos {
  private listaContratos: Contrato[] = [];

  constructor() {
    let aluno1: Aluno = new Aluno('Carlim', new Date('2000-05-02'), 'M');
    let aluno2: Aluno = new Aluno('Joao', new Date('2001-08-04'), 'M');
    let aluno3: Aluno = new Aluno('Maria', new Date('1999-10-02'), 'F');
    let aluno4: Aluno = new Aluno('Aninha', new Date('1999-10-28'), 'F');
    let aluno5: Aluno = new Aluno('Lucas Silva', new Date('2014-05-12'), 'M');
    let aluno6: Aluno = new Aluno('Mariana Souza', new Date('2016-09-23'), 'F');

    let responsavel1: Responsavel = new Responsavel(
      'Responsável 1',
      '12345678901',
      11123456789
    );
    let responsavel2: Responsavel = new Responsavel(
      'Responsável 2',
      '12345678902',
      61123456789
    );
    let responsavel3: Responsavel = new Responsavel(
      'Responsável 3',
      '12345678903',
      1112345123
    );
    let responsavel4: Responsavel = new Responsavel(
      'Responsável 4',
      '12345678904',
      11123116789
    );
    let responsavel5: Responsavel = new Responsavel(
      'Responsável 5',
      '12345678905',
      32123456789
    );
    let responsavel6: Responsavel = new Responsavel(
      'Responsável 6',
      '12345678906',
      76123456789
    );

    this.listaContratos = [
      new Contrato(
        responsavel1,
        aluno1,
        new Date('2024-03-01'),
        ['Segunda'],
        500,
        new Date('2024-02-28')
      ),
      new Contrato(
        responsavel2,
        aluno2,
        new Date('2024-04-01'),
        ['Terça', 'Quinta'],
        400,
        new Date('2024-03-31')
      ),
      new Contrato(
        responsavel3,
        aluno3,
        new Date('2024-05-01'),
        ['Segunda', 'Quarta', 'Sexta'],
        600,
        new Date('2024-04-30')
      ),
      new Contrato(
        responsavel4,
        aluno4,
        new Date('2024-06-01'),
        ['Terça', 'Quinta'],
        450,
        new Date('2024-05-31')
      ),
      new Contrato(
        responsavel5,
        aluno5,
        new Date('2024-07-01'),
        ['Segunda', 'Quarta'],
        550,
        new Date('2024-06-30')
      ),
      new Contrato(
        responsavel6,
        aluno6,
        new Date('2024-08-01'),
        ['Segunda', 'Quarta', 'Sexta'],
        500,
        new Date('2024-07-31')
      ),
    ];

    this.listaContratos[0].id = 1;
    this.listaContratos[1].id = 2;
    this.listaContratos[2].id = 3;
    this.listaContratos[3].id = 4;
    this.listaContratos[4].id = 5;
    this.listaContratos[5].id = 6;
  }

  adicionarContratoNalista(novoContrato: Contrato) {
    this.listaContratos.push(novoContrato);
  }

  removerContratoDaLista(id: Number) {
    const index = this.listaContratos.findIndex(
      (alunoLista) => alunoLista.id === id
    );

    if (index !== -1) {
      this.listaContratos.splice(index, 1);
    }
  }

  listarContrato(): Contrato[] {
    return this.listaContratos;
  }

  capturarUltimoId(): Number {
    const ultimoId = this.listaContratos.length + 1;
    return ultimoId;
  }

  findBydId(id: Number): Contrato {
    const contratoEncontrado = this.listaContratos.find(
      (item) => item.id == id
    );
    return contratoEncontrado;
  }

  AtualizarContratoNalista(contrato: Contrato) {
    this.listaContratos = this.listaContratos.map((item) => {
      if ((item.id = contrato.id)) {
        return (item = contrato);
      } else {
        return item;
      }
    });
  }
}

import { Aluno } from './Alunos';
import { Responsavel } from './Responsavel';

export class Contrato {
  id: Number;  
  responsavel: Responsavel;
  alunos: Aluno [];
  dataCadastro: Date;
  dataInicio: Date;
  dataFim?: Date;
  _dias: String[];
  valor: Number;
  dataPagamento: Date;
  situacao: String;
  ressarcimentoEmFeriados: Boolean;


  constructor(
    responsavel: Responsavel,
    alunos: Aluno[],
    dataInicio: Date,
    valor: Number,
    dataPagamento: Date,
    dias?: String[],
    id?: Number

  ) {
    this.responsavel = responsavel,
    this.alunos = alunos,
    this.dataCadastro = new Date();
    this.dataInicio = dataInicio;
    this._dias = dias;
    this.valor = valor;
    this.dataPagamento = dataPagamento;
    this.situacao = "Iniciado";
    this.id = id;
  }


  get dias(): String[] {
    return this._dias;
  }





  set dias(dias: String[]) {
    if (dias.length > 5) {
      throw new Error('O número máximo de dias permitidos é 5.');
    }
    this._dias = dias;
  }



}

import { Aula } from '../interfaces/aula';
import { Aluno } from './Alunos';
import { Responsavel } from './Responsavel';

export class Contrato {
  id: Number;  
  responsavel: Responsavel;
  aluno: Aluno;
  dataCadastro: Date;
  dataInicio: Date;
  dataFim?: Date;
  _dias: Aula[];
  valor: Number;
  diaPagamento: Number;
  situacao: String;
  isDiasAlternados: boolean;
  ressarcimentoEmFeriados: Boolean;
  autorizacaoImagem: Boolean;


  constructor(
    responsavel: Responsavel,
    aluno: Aluno,
    dataInicio: Date,
    valor: Number,
    diaPagamento: Number,
    autorizacaoImagem: Boolean,
    isDiasAlternados: boolean,
    ressarcimentoEmFeriados: Boolean,
    dias?: Aula[],
    id?: Number


  ) {
    this.responsavel = responsavel,
    this.aluno = aluno,
    this.dataCadastro = new Date();
    this.dataInicio = dataInicio;
    this._dias = dias;
    this.valor = valor;
    this.diaPagamento = diaPagamento;
    this.situacao = "Iniciado";
    this.id = id;
    this.autorizacaoImagem = autorizacaoImagem;
    this.isDiasAlternados = isDiasAlternados;
    this.ressarcimentoEmFeriados = ressarcimentoEmFeriados;
  }


  get dias(): Aula[] {
    return this._dias;
  }


  set dias(dias: Aula[]) {
    if (dias.length > 5) {
      throw new Error('O número máximo de dias permitidos é 5.');
    }
    this._dias = dias;
  }



}

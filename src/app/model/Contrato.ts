import { Aluno } from './Alunos';
import { Responsavel } from './Responsavel';

export class Contrato {
  private _id: Number;  
  private _responsavel: Responsavel;
  private _aluno: Aluno;
  private _dataCadastro: Date;
  private _dataInicio: Date;
  private _dataFim?: Date;
  private _dias: String[];
  private _valor: Number;
  private _dataPagamento: Date;
  private _situacao: String;
  private _ressarcimentoEmFeriados: Boolean;

  constructor(
    responsavel: Responsavel,
    aluno: Aluno,
    dataInicio: Date,
    dias: String[],
    valor: Number,
    dataPagamento: Date,
    dataFim?: Date
  ) {
    this._responsavel = responsavel,
    this._aluno = aluno,
    this._dataCadastro = new Date();
    this._dataInicio = dataInicio;
    this._dias = dias;
    this._valor = valor;
    this._dataPagamento = dataPagamento;
    this._situacao = "Iniciado"
  }

  // Getters
  get responsavel(): Responsavel {
    return this._responsavel;
  }

  get aluno(): Aluno {
    return this._aluno;
  }

  get dataCadastro(): Date {
    return this._dataCadastro;
  }

  get dataInicio(): Date {
    return this._dataInicio;
  }

  get dataFim(): Date | undefined {
    return this._dataFim;
  }

  get dias(): String[] {
    return this._dias;
  }

  get valor(): Number {
    return this._valor;
  }

  get dataPagamento(): Date {
    return this._dataPagamento;
  }
  get id(): Number {
    return this._id;
  }

  get situacao(): String {
    return this._situacao;
  }

  get ressarcimentoEmFeriados(): Boolean{
    return this._ressarcimentoEmFeriados
  }


  // Setters
  set responsavel(responsavel: Responsavel) {
    this._responsavel = responsavel;
  }

  set aluno(aluno: Aluno) {
    this._aluno = aluno;
  }

  set dataCadastro(dataCadastro: Date) {
    this._dataCadastro = dataCadastro;
  }

  set dataInicio(dataInicio: Date) {
    this._dataInicio = dataInicio;
  }

  set dataFim(dataFim: Date | undefined) {
    this._dataFim = dataFim;
  }

  set dias(dias: String[]) {
    if (dias.length > 5) {
      throw new Error('O número máximo de dias permitidos é 5.');
    }
    this._dias = dias;
  }

  set valor(valor: Number) {
    this._valor = valor;
  }

  set dataPagamento(dataPagamento: Date) {
    this._dataPagamento = dataPagamento;
  }


  set id(id: Number) {
    this._id = id;
  }

  set situacao(situacao: String) {
    this._situacao = situacao;
  }
  set ressarcimentoEmFeriados(ressarcimento: Boolean) {
    this._ressarcimentoEmFeriados = ressarcimento;
  }


}

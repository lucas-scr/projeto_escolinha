import { Pessoa } from "../interfaces/pessoa";

 export class Aluno implements Pessoa {

    nome: String;
    private _idade: Number;
    private _dataNascimento: Date;
    private _dias: String[];
    private _autorizacaoDeImagem: Boolean;

    constructor(nome: String, idade: Number, dataNascimento: Date, autorizacaoDeImagem: Boolean, diasDaSemana?: String[]){
        this.nome = nome;
        this._idade = idade;
        this._dataNascimento = dataNascimento;
        this._autorizacaoDeImagem = autorizacaoDeImagem;
    }

    get getNome(): String{
        return this.nome;
    }

    get idade(): Number{
        return this._idade;
    }
    
    get dataNascimento(): Date{
        return this._dataNascimento;
    }

    get dias(): String [] {
        return this._dias
    }

    get autorizacaoDeImagem():Boolean{
        return this._autorizacaoDeImagem
    }

    set setNome(nome: String){
        this.nome = nome;
    }

    set idade(idade: Number){
        this._idade = idade;
    }

    set dataNascimento(valor: Date) {
        if (!(valor instanceof Date) || isNaN(valor.getTime())) {
          throw new Error("Data de nascimento inválida!");
        }
        this._dataNascimento = valor;
      }

    set dias(diasAdicionados: string[]){
        this._dias = diasAdicionados;
    }

    set autorizacaoDeImagem(autorizao: boolean){
        this._autorizacaoDeImagem  = autorizao;
    }
}
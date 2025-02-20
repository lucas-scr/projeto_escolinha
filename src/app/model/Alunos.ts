import { Pessoa } from "../interfaces/pessoa";

 export class Aluno implements Pessoa {
    private _id: Number;
    nome: String;
    private _idade?: Number;
    private _dataNascimento: Date;
    private _dias: String[];
    private _autorizacaoDeImagem?: Boolean;
    private _iniciaisNome: String;
    private _sexo: String;

    constructor(nome: String, dataNascimento: Date, sexo: String ,autorizacaoDeImagem?: boolean, diasDaSemana?: String[]){
        this.nome = nome;
        this._dataNascimento = dataNascimento;
        this._autorizacaoDeImagem = autorizacaoDeImagem;
        this._iniciaisNome = this.gerarIniciais(nome);
        this._sexo = sexo;
        this._dias = diasDaSemana;
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
        if (!nome.trim()) throw new Error("Nome não pode ser vazio!");
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

    set autorizacaoDeImagem(autorizao: Boolean){
        this._autorizacaoDeImagem  = autorizao;
    }

    
    get iniciaisNome():String{
        return this._iniciaisNome
    }

    set iniciaisNome(iniciais: String){
        if (iniciais.length > 2) {
            throw new Error("Inicial maior que dois caracteres");
        }
          this._iniciaisNome = iniciais;
    }

    get sexo():String{
        return this._sexo;
    }

    set sexo(sexo: String){
        if (sexo.length < 1 || (sexo !== "M" && sexo !== "F")) {
            throw new Error("Informe M ou F");
        }
          this._sexo = sexo.toUpperCase();
    }


    gerarIniciais(nome: String):String{
        let partes = nome.trim().split(/\s+/);
        if (partes.length < 2) {
            let inicialApenasUmNome = partes[0][0].toUpperCase();
            return inicialApenasUmNome;
        }
        let inicialPrimeiroNome = partes[0][0].toUpperCase();
        let inicialUltimoNome = partes [partes.length -1][0].toUpperCase();
        return  inicialPrimeiroNome + inicialUltimoNome;
    }

    get id():Number{
        return this._id;
    }

    set id(id: Number){
       this._id = id;
    }



}
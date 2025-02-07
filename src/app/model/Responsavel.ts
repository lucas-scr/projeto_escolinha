import { Pessoa } from "../interfaces/pessoa";

export class Responsavel implements Pessoa{
    nome: String;
    private _documento: String;

    constructor(nome: String, documento: String){
        this.nome = nome;
        this._documento = documento;
    }

    get getNome(): String {
        return this.nome;
    }

    set setNome(valor: String) {
        if (!valor.trim()) throw new Error("Nome não pode ser vazio!");
        this.nome = valor;
    }

    get documento(): String {
        return this._documento;
    }

    set documento(valor: String) {
        if (!valor.trim()) throw new Error("Documento não pode ser vazio!");
        this._documento = valor;
    }

}
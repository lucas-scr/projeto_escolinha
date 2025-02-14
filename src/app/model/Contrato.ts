import { Aluno } from "./Alunos";
import { Responsavel } from "./Responsavel";

export class Contrato{

    private responsavel: Responsavel;
    private aluno: Aluno;
    private dataCadastro: Date;
    private dataInicio: Date;
    private dataFim?: Date;
    private dias: [5];
    private valor: Number;
    private dataPagamento: Date;
    
    constructor(){

    }


}
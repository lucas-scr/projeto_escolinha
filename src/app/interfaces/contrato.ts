import { Aluno } from "./aluno";
import { Aula } from "./aula";
import { Contato } from "./contato";

export interface Contrato{
      id: Number;  
      responsavelNome: String;
      documentoResponsavel: String;
      telefoneResponsavelPrincipal: String;
      aluno: Aluno;
      dataCriacao: Date;
      dataInicio: Date;
      dataFim?: Date;
      diasDasAulas?: Aula[];
      valorPagamento: Number;
      diaPagamento: Number;
      situacao: String;
      diasAlternados: boolean;
      ressarcimentoEmFeriados: Boolean;
      autorizaUsoDeImagem: Boolean;
      listaContatos: Contato[]
      situacoesContrato: String;
}


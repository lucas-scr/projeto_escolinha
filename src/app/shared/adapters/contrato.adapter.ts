import { Contrato } from "../../interfaces/contrato";
import { Aluno } from "../../model/Alunos";
import { DiasDaSemana } from "../Enums/enumDiasDaSemana";
import { Situacoes } from "../Enums/enumSituacoes";

export function adaptarContratoParaResponse(d: any): Contrato {
  return {
    id: d.id,
    nomeResponsavel: d.nomeResponsavel,
    documentoResponsavel: d.documentoResponsavel,
    telefoneResponsavelPrincipal: d.telefoneResponsavelPrincipal,
    listaContatos: d.listaContatos,
    aluno: {
        ...d.aluno,
        iniciais: gerarIniciais(d.aluno?.nome || '')
    },
    dataCriacao: d.dataCriacao,
    dataInicio: d.dataInicio,
    dataFim: d.dataFim,
    diasDasAulas: d.diasDasAulas.map((aula: any) => ({
        id: aula.id,
        diaSemana: DiasDaSemana[aula.diaSemana],
        horario: aula.horario
    })),
    valorPagamento: d.valorPagamento,
    diaPagamento: d.diaPagamento,
    situacoesContrato: d.situacoesContrato,
    diasAlternados: d.diasAlternados,
    ressarcimentoEmFeriados: d.ressarcimentoEmFeriados,
    autorizaUsoDeImagem: d.autorizaUsoDeImagem,
    situacao: Situacoes[d.situacao]
  };
}


export function adapterContratoParaRequest(d: Contrato): any{
  return {
    documentoResponsavel: d.documentoResponsavel,
    telefoneResponsavelPrincipal: d.telefoneResponsavelPrincipal,
    listaContatos: d.listaContatos.map((c: any) => ({
      id: c.id,
      telefone: c.telefone,
      responsavel: c.responsavel,
      principal: c.principal,
    })),
    aluno: {
      id: d.aluno.id,
      nome: d.aluno.nome,
      dataNascimento: d.aluno.dataNascimento.toString().split('T')[0],
      sexo: d.aluno.sexo
    },
    dataInicio: d.dataInicio.toString().split('T')[0],
    diaPagamento: d.diaPagamento,
    valorPagamento: d.valorPagamento,
    autorizaUsoDeImagem: d.autorizaUsoDeImagem,
    nomeResponsavel: d.nomeResponsavel,
    ressarcimentoEmFeriados: d.ressarcimentoEmFeriados,
    diasDasAulas: d.diasDasAulas.map((dia: any) => ({
      id: dia.id,
      horario: dia.horario,
      diaSemana: dia.diaSemana
    })),
    diasAlternados: d.diasAlternados
  }
}

function gerarIniciais(nome: string):string{
      if (!nome) return '';
        let partes = nome.trim().split(/\s+/);
        if (partes.length < 2) {
            let inicialApenasUmNome = partes[0][0].toUpperCase();
            return inicialApenasUmNome;
        }
        let inicialPrimeiroNome = partes[0][0].toUpperCase();
        let inicialUltimoNome = partes [partes.length -1][0].toUpperCase();
        return  inicialPrimeiroNome + inicialUltimoNome;
    }


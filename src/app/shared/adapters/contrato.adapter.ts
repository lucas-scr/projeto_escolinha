import { Contrato } from "../../interfaces/contrato";
import { Aluno } from "../../model/Alunos";
import { DiasDaSemana } from "../enumDiasDaSemana";

export function adaptarContrato(d: any): Contrato {
  return {
    id: d.id,
    responsavelNome: d.nomeResponsavel,
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
    situacao: d.situacao
  };
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


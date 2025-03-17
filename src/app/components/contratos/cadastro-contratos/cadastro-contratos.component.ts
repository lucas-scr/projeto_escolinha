import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Responsavel } from '../../../model/Responsavel';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Aluno } from '../../../model/Alunos';
import { MessageService } from 'primeng/api';
import { ServiceContratos } from '../../../services/service_contratos';
import { Contrato } from '../../../model/Contrato';
import { DiasDaSemana } from '../../../common/enumDiasDaSemana';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { Aula } from '../../../interfaces/aula';

@Component({
  selector: 'app-cadastro-contratos',
  imports: [RouterLink, PrimengImports],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css',
  providers: [MessageService],
})
export class CadastroContratosComponent implements OnInit {
  modalAdicionarDia: boolean = false;

  horarioInicio_aula: Date;
  diaSelecionado: string;

  responsavel: Responsavel = new Responsavel('', '', 4123412);
  nome: String;
  dataNascimento: Date;
  sexo: String;
  valorContratado: Number;
  dataInicio: Date = new Date();
  dataLimite: Date = new Date();

  diaPagamento: Number;
  autorizacaoDeImagem: boolean = false;
  ressarcimentoEmFeriados: Boolean;

  dias: String[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  aulas: Aula[] = [];

  isDiasAlternados: boolean;

  constructor(
    private messageService: ServiceMensagemGlobal,
    private contratoService: ServiceContratos,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.limparDiasSelecionados();
    let aluno = new Aluno(
      this.nome,
      this.dataNascimento,
      this.sexo,
      this.autorizacaoDeImagem,
      this.isDiasAlternados,
      this.aulas
    );
    let novoContrato = new Contrato(
      this.responsavel,
      aluno,
      this.dataInicio,
      this.valorContratado,
      this.diaPagamento,
      this.autorizacaoDeImagem,
      this.isDiasAlternados,
      this.ressarcimentoEmFeriados,
      this.aulas
    );

    this.cadastrarContrato(novoContrato);
    this.router.navigate(['/contratos']);
  }

  limparDiasSelecionados() {
    if (this.isDiasAlternados) {
      this.aulas = [];
    }
  }

  removerDiaDaSemana(index: number) {
    this.aulas.splice(index, 1);
  }
  adicionarDiaDaSemana() {
    this.aulas.push({
      dia: this.diaSelecionado,
      horario: this.horarioInicio_aula,
    });
    this.atualizarListaDiasAdicionados();
    this.fecharModalAdicionarDia();
  }

  abrirModalAdicionarAula() {
    this.limparDadosModal();
    this.modalAdicionarDia = true;
  }
  fecharModalAdicionarDia() {
    this.modalAdicionarDia = false;
  }

  diasDisponiveis(): String[] {
    return this.dias.filter((dia) => {
      const ocupado = this.aulas.some((aula) => aula.dia === dia);
      return !ocupado;
    });
  }

  atualizarListaDiasAdicionados() {
    this.aulas.sort(
      (a, b) => this.dias.indexOf(a.dia) - this.dias.indexOf(b.dia)
    );
  }

  limparDadosModal() {
    this.diaSelecionado = undefined;
    this.horarioInicio_aula = undefined;
  }

  cadastrarContrato(novoContrato: Contrato) {
    this.contratoService.cadastrarContrato(novoContrato).subscribe({
      next: () =>
        this.messageService.showMessage(
          'success',
          'Cadastrado!',
          'Cadastro realizado com sucesso.'
        ),
      error: () =>
        this.messageService.showMessage(
          'danger',
          'Algo deu errado!',
          'Não foi possível realizar o cadastro.'
        ),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { PrimengImports } from '../../../shared/primengImports.module';
import { MessageService } from 'primeng/api';
import { ServiceContratos } from '../../../services/service_contratos';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { Aula } from '../../../interfaces/aula';
import { DiasDaSemana } from '../../../shared/Enums/enumDiasDaSemana';
import { ModalAdicionarDiaComponent } from "../../../shared/modal-adicionar-dia/modal-adicionar-dia.component";
import { Contrato } from '../../../interfaces/contrato';

@Component({
  selector: 'app-cadastro-contratos',
  imports: [RouterLink, PrimengImports, ModalAdicionarDiaComponent],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css',
  providers: [MessageService],
})
export class CadastroContratosComponent implements OnInit {

  modalAdicionarDia: boolean = false;

  nomeResponsavel: String;
  documentoResponsavel: String;
  telefoneResponsavelPrincipal: String;
  nomeAluno: String;
  dataNascimento: Date;
  sexo: String;
  isDiasAlternados: boolean;
  horarioAulasAlterndas: Date;
  dataInicio: Date = new Date();
  dataLimite: Date = new Date();
  diaPagamento: Number;
  valorContratado: Number;
  autorizacaoDeImagem: boolean = false;
  ressarcimentoEmFeriados: Boolean;

  aulas: Aula[] = [];

  dias: string[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];



  constructor(
    private messageService: ServiceMensagemGlobal,
    private contratoService: ServiceContratos,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.limparDiasSelecionados();
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

  adicionarDiaDaSemana(event: { dia: DiasDaSemana, horario: String }) {
    const novaAula: Aula = {
      diaSemana: event.dia,
      horario: event.horario
    }
    this.aulas.push(novaAula)
    this.aulas.sort(
      (a, b) => this.dias.indexOf(DiasDaSemana[a.diaSemana]) - this.dias.indexOf(DiasDaSemana[b.diaSemana])
    );

    this.fecharModalAdicionarDia();
  }

  fecharModalAdicionarDia(){
    this.modalAdicionarDia = false;
    this.atualizarListaDiasAdicionados()
  }

  
  abrirModalAdicionarDia(){
    this.modalAdicionarDia = true;
  }

  atualizarListaDiasAdicionados() {
    this.aulas.sort(
      (a, b) => this.dias.indexOf(DiasDaSemana[a.diaSemana]) - this.dias.indexOf(DiasDaSemana[b.diaSemana])
    );
  }
}

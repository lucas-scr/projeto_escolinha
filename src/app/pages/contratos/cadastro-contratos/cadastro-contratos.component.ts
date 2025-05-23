import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Responsavel } from '../../../model/Responsavel';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Aluno } from '../../../model/Alunos';
import { MessageService } from 'primeng/api';
import { ServiceContratos } from '../../../services/service_contratos';
import { Contrato } from '../../../model/Contrato';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { Aula } from '../../../interfaces/aula';
import { DiasDaSemana } from '../../../shared/enumDiasDaSemana';
import { ModalAdicionarDiaComponent } from "../../../shared/modal-adicionar-dia/modal-adicionar-dia.component";

@Component({
  selector: 'app-cadastro-contratos',
  imports: [RouterLink, PrimengImports, ModalAdicionarDiaComponent],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css',
  providers: [MessageService],
})
export class CadastroContratosComponent implements OnInit {
  
  modalAdicionarDia: boolean = false;

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

  aulas: Aula[] = [];

  dias: string[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  isDiasAlternados: boolean;

  constructor(
    private messageService: ServiceMensagemGlobal,
    private contratoService: ServiceContratos,
    private router: Router
  ) { }

  ngOnInit() { }

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

  adicionarDiaDaSemana(event: { dia: string, horario: Date }) {
    this.aulas.push(event);
    this.aulas.sort(
      (a, b) => this.dias.indexOf(a.dia) - this.dias.indexOf(b.dia)
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
      (a, b) => this.dias.indexOf(a.dia) - this.dias.indexOf(b.dia)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Responsavel } from '../../model/Responsavel';
import { PrimengImports } from '../../shared/primengImports.module';
import { Aluno } from '../../model/Alunos';
import { MessageService } from 'primeng/api';
import { ServiceContratos } from '../../services/service_contratos';
import { ServiceAlunos } from '../../services/service_alunos';
import { Contrato } from '../../model/Contrato';
import { DiasDaSemana } from '../../common/enumDiasDaSemana';

@Component({
  selector: 'app-cadastro-contratos',
  imports: [RouterLink, PrimengImports],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css',
  providers: [MessageService],
})
export class CadastroContratosComponent implements OnInit {
  modalAdicionar: boolean = false;

  responsavel: Responsavel = new Responsavel('', '');
  alunoNovo: Aluno;

  nome: String;
  dataNascimento: Date;
  sexo: String;
  valorContratado: Number;
  dataInicio: Date;

  dataPagamento: Date;
  autorizacaoDeImagem: boolean = false;
  ressarcimentoEmFeriados: Boolean;

  alunos: Aluno[] = [];

  dias: string[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.SEXTA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA
  ];
  diasSelecionados: string[] = [];

  novoContrato: Contrato;

  constructor(
    private messageService: MessageService,
    private contratoService: ServiceContratos,
    private serviceAlunos: ServiceAlunos,
    private router: Router
  ) {}

  ngOnInit() {
    this.alunos.push(
      new Aluno('Aluno 1 da Silva', new Date(), 'F', this.autorizacaoDeImagem, [
        'Segunda',
        'Terça',
      ])
    );
  }

  onSubmit() {
    this.novoContrato = new Contrato(this.responsavel, this.alunos,this.dataInicio, ["Segunda"], this.valorContratado, this.dataPagamento)
    this.contratoService.adicionarContratoNalista(this.novoContrato);
    this.router.navigate(['/contratos']);
  }

  abrirModalAdicionarAluno() {
    this.modalAdicionar = true;
    this.limparDadosAluno();
  }

  adicionarAluno() {
    this.alunos.push(
      new Aluno(
        this.nome,
        this.dataNascimento,
        this.sexo,
        this.autorizacaoDeImagem,
        this.diasSelecionados
      )
    );
    this.modalAdicionar = false;
    this.alunos = [...this.alunos]; 

    console.log(this.alunos);
  }
  removerAluno(aluno: Aluno) {
    const index = this.alunos.findIndex((alunoLista) => alunoLista === aluno);
    if (index !== -1) {
      this.alunos.splice(index, 1);
    }
  }

  limparDadosAluno() {
    this.nome = '';
    this.dataNascimento = undefined;
    this.sexo = undefined;
    this.diasSelecionados = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Responsavel } from '../../model/Responsavel';
import { PrimengImports } from '../../shared/primengImports.module';
import { Aluno } from '../../model/Alunos';
import { MessageService } from 'primeng/api';
import { ServiceContratos } from '../../services/service_contratos';
import { ServiceAlunos } from '../../services/service_alunos';

@Component({
  selector: 'app-cadastro-contratos',
  imports: [RouterLink, PrimengImports],
  templateUrl: './cadastro-contratos.component.html',
  styleUrl: './cadastro-contratos.component.css',
  providers: [MessageService],
})
export class CadastroContratosComponent implements OnInit {
  responsavel: Responsavel = new Responsavel('', '');
  alunoNovo: Aluno;

  nome: String;
  autorizacaoDeImagem: Boolean;
  ressarcimentoEmFeriados: Boolean;
  dataNascimento: Date;
  sexo: String;
  valorContratado: Number;
  dataInicio: Date;
  dataPagamento: Date;
  dias: any[] = [
    { name: 'Segunda', key: 'SEG' },
    { name: 'Terça', key: 'TER' },
    { name: 'Quarta', key: 'QUA' },
    { name: 'Quinta', key: 'QUI' },
    { name: 'Sexta', key: 'SEX' },
  ];
  diasSelecionados: any[] = [];

  constructor(
    private messageService: MessageService,
    private contratoService: ServiceContratos,
    private serviceAlunos: ServiceAlunos
  ) {}

  ngOnInit() {
    this.diasSelecionados = [this.dias];
  }

  onSubmit() {
    this.alunoNovo = new Aluno(this.nome,this.dataNascimento, this.autorizacaoDeImagem, this.sexo);
    this.serviceAlunos.adicionarAlunosNalista(this.alunoNovo);
    
    console.log(Aluno)
  }
}

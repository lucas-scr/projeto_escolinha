import { Component, OnInit } from '@angular/core';
import { ServiceAlunos } from '../../../services/service_alunos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Aluno } from '../../../model/Alunos';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { DiasDaSemana } from '../../../common/enumDiasDaSemana';
import { PrimengImports } from '../../../shared/primengImports.module';

@Component({
  selector: 'app-editar-alunos',
  imports: [PrimengImports, RouterLink],
  templateUrl: './editar-alunos.component.html',
  styleUrl: './editar-alunos.component.css',
})
export class EditarAlunosComponent implements OnInit {
  alunoId: Number | undefined;

  nome: String;
  dataNascimentoLimite: Date = new Date();
  dataNascimento: Date;
  sexo: String;
  autorizacaoDeImagem: Boolean;
  dias: string[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  diasSelecionados: string[] = [];

  constructor(
    private serviceAlunos: ServiceAlunos,
    private route: ActivatedRoute,
    private serviceMensagemGlobal: ServiceMensagemGlobal
  ) {
    this.capturarId();
  }

  onSubmit() {
    let novoAluno: Aluno = new Aluno(
      this.nome,
      this.dataNascimento,
      this.sexo,
      this.autorizacaoDeImagem,
      this.diasSelecionados,
      this.alunoId
    );

    this.serviceAlunos
      .atualizarAlunoNalista(this.alunoId, novoAluno)
      .subscribe({
        next: () =>
          this.serviceMensagemGlobal.showMessage(
            'success',
            'Atualização',
            'Os dados do aluno foram atualizados com sucesso.'
          ),
        error: (erro) => {
          this.serviceMensagemGlobal.showMessage(
            'warn',
            'Cadastro',
            'Ocorreu um erro. Tente novamente mais tarde'
          ),
            console.log(erro);
        },
      });

    history.back();
  }
  ngOnInit() {}
  capturarId() {
    this.route.params.subscribe((params) => {
      if (params != undefined) {
        this.alunoId = params['id'];
        this.carregarDadosAluno();
      } else {
        throw console.error('Aluno não identificado');
      }
    });
  }

  carregarDadosAluno() {
    this.serviceAlunos.findById(this.alunoId).subscribe((res) => {
      this.nome = res.nome;
      this.dataNascimento = new Date(res.dataNascimento);
      this.sexo = res.sexo;
      this.autorizacaoDeImagem = res.autorizacaoDeImagem;
      this.diasSelecionados = res.dias;
      this.alunoId = res.id;
    });
  }
}

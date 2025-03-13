import { Component, isStandalone, LOCALE_ID, OnInit } from '@angular/core';
import { ServiceAlunos } from '../../../services/service_alunos';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Aluno } from '../../../model/Alunos';
import { PrimengImports } from '../../../shared/primengImports.module';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { DiasDaSemana } from '../../../common/enumDiasDaSemana';


@Component({
  selector: 'app-cadastro-alunos',
  imports: [PrimengImports, RouterModule, RouterLink],
  templateUrl: './cadastro-alunos.component.html',
  styleUrl: './cadastro-alunos.component.css',
  providers: [ServiceMensagemGlobal],
})
export class CadastroAlunosComponent implements OnInit {
  sexo: String = 'M';
  nome: String;
  dataNascimentoLimite: Date = new Date();
  dataNascimento: Date = new Date();
  isDiasAlternados: boolean;
  autorizacaoDeImagem: boolean = false;
  dias: string [] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  diasSelecionados: [] = [];

  constructor(
    private serviceAlunos: ServiceAlunos,
    private router: Router,
    private serviceMensagemGlobal: ServiceMensagemGlobal
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.selecionarDiasAlternados();
    let alunoNovo = new Aluno(
      this.nome,
      this.dataNascimento,
      this.sexo,
      this.autorizacaoDeImagem, this.isDiasAlternados,
      this.diasSelecionados
    );
    this.serviceAlunos.adicionarAlunoNaLista(alunoNovo).subscribe({
      next: () =>
        this.serviceMensagemGlobal.showMessage(
          'success',
          'Cadastro',
          'Aluno cadastrado com sucesso.'
        ),
    });
    this.router.navigate(['/alunos']);
  }

  selecionarDiasAlternados(){
    if(this.isDiasAlternados){
      this.diasSelecionados = [];
    }
  }
}

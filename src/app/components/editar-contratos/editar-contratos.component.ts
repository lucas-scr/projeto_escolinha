import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../model/Contrato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceMensagemGlobal } from '../../services/mensagens_global';
import { ServiceContratos } from '../../services/service_contratos';
import { Aluno } from '../../model/Alunos';
import { DiasDaSemana } from '../../common/enumDiasDaSemana';
import { PrimengImports } from '../../shared/primengImports.module';

@Component({
  selector: 'app-editar-contratos',
  imports: [RouterLink, PrimengImports],
  templateUrl: './editar-contratos.component.html',
  styleUrl: './editar-contratos.component.css',
})
export class EditarContratosComponent implements OnInit {
  modalAdicionar: boolean = false;

  contratoId: Number;
  contratoCarregado: Contrato;
  contato: Number = 12345678901;

  

  alunoNovo: Aluno;
  nome: String;
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
    private messageService: ServiceMensagemGlobal,
    private contratoService: ServiceContratos,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.capturarId();

  }

  ngOnInit() {
   // this.capturarId();
  }

  onSubmit() {
    this.contratoService.atualizarContrato(this.contratoId,this.contratoCarregado).subscribe({
      next: () =>
        this.messageService.showMessage(
          'success',
          'Atualizado!',
          'Contrato atualizado com sucesso.'
        ),
      error: () =>
        this.messageService.showMessage(
          'danger',
          'Algo deu errado!',
          'Não foi possível realizar a atualização.'
        ),
    });

    this.router.navigate(['/contratos']);
  }

  abrirModalAdicionarAluno() {
    this.modalAdicionar = true;
    this.limparDadosAluno();
  }

  adicionarAluno() {
    this.contratoCarregado.alunos.push(
      new Aluno(
        this.nome,
        this.dataNascimento,
        this.sexo,
        this.autorizacaoDeImagem,
        this.diasSelecionados
      )
    );
    this.modalAdicionar = false;
    this.contratoCarregado.alunos = [...this.contratoCarregado.alunos];
  }
  removerAluno(aluno: Aluno) {
    const index = this.contratoCarregado.alunos.findIndex((alunoLista) => alunoLista === aluno);
    if (index !== -1) {
      this.contratoCarregado.alunos.splice(index, 1);
    }
  }

  limparDadosAluno() {
    this.nome = '';
    this.dataNascimento = undefined;
    this.sexo = undefined;
    this.diasSelecionados = undefined;
  }

  carregarDadosContrato(id: Number) {
    this.contratoService.findById(id).subscribe({
      next: (contrato) => {
        this.contratoCarregado = contrato;
        this.contratoCarregado.dataInicio = new Date (contrato.dataInicio);
        this.contato = contrato.responsavel.contato
      },
      error: (erro) => {
        this.messageService.showMessage(
          'danger',
          'Erro',
          'Não conseguimos recuperar os dados do contrato.'
        );
        console.log(erro);
      },

    });
  }
  capturarId(){
    this.route.params.subscribe((params)=> {
      if(params != undefined){
        this.contratoId = params['id'];
        this.carregarDadosContrato(this.contratoId)

      }else{
        throw console.error('Aluno não identificado');
      }
    })
  }

}

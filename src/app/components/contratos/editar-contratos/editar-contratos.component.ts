import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../../model/Contrato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { ServiceContratos } from '../../../services/service_contratos';
import { Aluno } from '../../../model/Alunos';
import { DiasDaSemana } from '../../../common/enumDiasDaSemana';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Aula } from '../../../interfaces/aula';

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
  dataLimite: Date = new Date();

  diaSelecionado: string;
  horarioInicio_aula: Date = new Date();




  dias: String[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  aulas: Aula[] = [];


  diasSelecionados: string[] = [];

  constructor(
    private messageService: ServiceMensagemGlobal,
    private contratoService: ServiceContratos,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.capturarId();
  }

  onSubmit() {
    if(this.contratoCarregado.isDiasAlternados){
      this.contratoCarregado._dias = [];
    }else{
      this.contratoCarregado._dias = this.aulas;
    }
    this.alterarContrato(this.contratoCarregado);

  }

  carregarDadosContrato(id: Number) {
    this.contratoService.findById(id).subscribe({
      next: (contrato) => {
        this.contratoCarregado = contrato;
        this.aulas = contrato._dias;
        this.contratoCarregado.dataInicio = new Date(contrato.dataInicio);
        this.contratoCarregado.aluno.dataNascimento = new Date (contrato.aluno.dataNascimento);
        this.contratoCarregado.dataInicio = new Date(contrato.dataInicio.getTime());
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
  capturarId() {
    this.route.params.subscribe((params) => {
      if (params != undefined) {
        this.contratoId = params['id'];
        this.carregarDadosContrato(this.contratoId);
      } else {
        throw console.error('Aluno não identificado');
      }
    });
  }

  abrirModalAdicionarAula() {
    this.limparDadosModal();
    this.modalAdicionar = true;
  }
  fecharModalAdicionarDia() {
    this.modalAdicionar = false;
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

  adicionarDiaDaSemana() {
    this.aulas.push({
      dia: this.diaSelecionado,
      horario: this.horarioInicio_aula,
    });
    this.atualizarListaDiasAdicionados();
    this.fecharModalAdicionarDia();
  }

  
  removerDiaDaSemana(index: number) {
    this.aulas.splice(index, 1);
  }

  alterarContrato(contratoAtualizado: Contrato){
    this.contratoService
    .atualizarContrato(this.contratoId, contratoAtualizado)
    .subscribe({
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
}

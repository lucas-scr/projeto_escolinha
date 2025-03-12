import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Aluno } from '../../../model/Alunos';
import { ServiceAlunos } from '../../../services/service_alunos';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importando o módulo
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';

@Component({
  selector: 'app-lista-alunos',
  imports: [PrimengImports],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ListaAlunosComponent implements OnInit {
  listaAlunos: Aluno[];
  filtroNome: String;

  @ViewChild('menu') menu!: Menu;

  alunoId: Number;;

  opcoesDeAcoes: MenuItem[] | undefined;

  constructor(
    private serviceAluno: ServiceAlunos,
    private router: Router,
    private messageService: ServiceMensagemGlobal,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    
    this.carregarDadosNaLista();

    this.opcoesDeAcoes = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Detalhar',
            icon: 'pi pi-eye',
            command: () =>
              this.router.navigate(['/detalhar-aluno', this.alunoId]),
          },
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () =>
              this.router.navigate(['/editar-aluno', this.alunoId]),
          },
          {
            label: 'Remover',
            icon: 'pi pi-trash',
            command: () => {
              this.confirmarRemover()
            },
          },
        ],
      },
    ];
  }

  carregarDadosNaLista(){
    this.serviceAluno.obterAlunos().subscribe({
      next: (dados) => this.listaAlunos = dados,
      error: (erro) => console.log('Erro:', erro)
    });
  }

  removerAlunoDaLista(id: Number) {
    this.serviceAluno.removerAluno(id).subscribe(
      {
        next: () => 
          {
            this.messageService.showMessage("success","Exclusão", "O aluno foi removido com sucesso.");
            this.carregarDadosNaLista()
          },
        error: (erro) => {
          this.messageService.showMessage("danger","Erro", "Não foi possível excluir o aluno." );
          console.log(erro)
        }

      }
    );
  }

  abrirMenu(event: Event, aluno: any) {
    this.alunoId = aluno;
    this.menu.toggle(event);
  }

  confirmarRemover() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja remover o aluno?',
      header: 'Remover aluno',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.removerAlunoDaLista(this.alunoId);
      },
    });
  }

  filtrarLista(event: any) {
    this.serviceAluno.obterAlunos().subscribe((alunos) => {
      if (this.filtroNome.length > 0) {
        this.listaAlunos = alunos.filter((aluno) =>
          aluno.nome.toLowerCase().startsWith(this.filtroNome.toLowerCase())
        );
      }else{
        this.listaAlunos = alunos
      }
    });
  }
}

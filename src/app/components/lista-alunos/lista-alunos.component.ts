import { Component, OnInit ,OnChanges, SimpleChanges, Input, OnDestroy, ViewChild } from '@angular/core';
import { PrimengImports } from '../../shared/primengImports.module';
import { Aluno } from '../../model/Alunos';
import { ServiceAlunos } from '../../services/service_alunos';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Router } from '@angular/router';






@Component({
  selector: 'app-lista-alunos',
  imports: [
    PrimengImports,

  ],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css',
  providers: [
    MessageService
  ]
})
export class ListaAlunosComponent implements OnInit {

  listaAlunos: Aluno[] = [];
  filtroNome: String;

  @ViewChild('menu') menu!: Menu

  alunoId: Number = 2;

  opcoesDeAcoes: MenuItem[] | undefined;

  constructor(private serviceAluno: ServiceAlunos, private router: Router, private messageService: MessageService){
    this.listaAlunos = serviceAluno.listarAlunos();
  }

  filtrarLista(event: any){
    if(this.filtroNome.length > 0){
      this.listaAlunos = this.serviceAluno.listarAlunos().filter(aluno => 
        aluno.nome
        .toLowerCase()
        .startsWith(this.filtroNome.toLowerCase()))
    }else{
      this.listaAlunos = this.serviceAluno.listarAlunos();
    }
  }

  ngOnInit(){
    this.opcoesDeAcoes = [
      { 
          label: 'Opções',
          items: [
            {
              label: 'Detalhar',
              icon: 'pi pi-eye',
              command: () => this.router.navigate(['/detalhar-aluno', this.alunoId])
          },
              {
                  label: 'Editar',
                  icon: 'pi pi-pencil',
                  command: () => this.router.navigate(['/editar-aluno', this.alunoId])

                },
              {
                  label: 'Remover',
                  icon: 'pi pi-trash',
                  command:() => this.removerAlunoDaLista(this.alunoId)
              }
          ]
      }
    ]
  }

  removerAlunoDaLista(id: Number){
    this.serviceAluno.removerAlunoDaLista(id);
    this.showMessage("success", "Título", "Item removido com sucesso");
  
  }

  abrirMenu(event: Event, aluno: any) {
    this.alunoId = aluno
    this.menu.toggle(event); // Exibe o menu no local correto
  }

  showMessage(tipoMensagem: String, titulo: String,mensagem: String){
    this.messageService.add({ severity: `${tipoMensagem}`, summary: `${titulo}`, detail: `${mensagem}`, life: 3000 });
  }
  
}

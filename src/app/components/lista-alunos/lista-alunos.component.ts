import { Component, OnInit ,OnChanges, SimpleChanges } from '@angular/core';
import { ServiceAlunos } from '../../services/service_alunos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../model/Alunos';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';





@Component({
  selector: 'app-lista-alunos',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DataViewModule,
    AvatarModule,
    DividerModule,
    ChipModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
    RouterLink,
    MenuModule,
    Menu
  ],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent implements OnInit {

  listaAlunos: Aluno[] = [];
  filtroNome: String;

  alunoId: Number

  opcoesDeAcoes: MenuItem[] | undefined;

  constructor(private serviceAluno: ServiceAlunos){
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

  }

  getOpcoesDeAcoes(aluno: Aluno): MenuItem[] {
    return [
      {
        label: 'Detalhar',
        icon: 'pi pi-eye',
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        routerLink: ['/editar-aluno/', aluno.id]
      },
      {
        label: 'Remover',
        icon: 'pi pi-trash',
      }
    ];
  }

  capturarId(alunoId: Number){
    console.log(alunoId)
    this.alunoId = alunoId
  }
}

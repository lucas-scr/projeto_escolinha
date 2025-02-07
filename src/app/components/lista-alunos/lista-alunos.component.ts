import { Component } from '@angular/core';
import { ServiceAlunos } from '../../services/service_alunos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../model/Alunos';


@Component({
  selector: 'app-lista-alunos',
  imports: [
    CommonModule,
    FormsModule

  ],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {

  listaAlunos: Aluno[] = [];

  constructor(private serviceAluno: ServiceAlunos){
    this.listaAlunos = serviceAluno.listarAlunos();
  }

}

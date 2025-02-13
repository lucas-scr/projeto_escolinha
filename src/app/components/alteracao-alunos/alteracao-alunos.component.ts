import { Component, isStandalone, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ServiceAlunos } from '../../services/service_alunos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Aluno } from '../../model/Alunos';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-alteracao-alunos',
  imports: [
    CardModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
    IftaLabelModule,
    DatePickerModule,
    RadioButtonModule,
    CheckboxModule,
    RouterLink
  ],
  templateUrl: './alteracao-alunos.component.html',
  styleUrl: './alteracao-alunos.component.css'
})
export class AlteracaoAlunosComponent implements OnInit {

  alunoId: Number | undefined;

  nome: String;
  dataNascimento: Date;
  sexo: String;
  autorizacaoDeImagem: Boolean = false;
  alunoAtualizado: Aluno;
  
  constructor(private serviceAlunos: ServiceAlunos, private route: ActivatedRoute){
    this.capturarId();
    this.carregarDados (this.serviceAlunos.findBydId(this.alunoId))
    console.log(this.serviceAlunos.findBydId(this.alunoId))

  }

  onSubmit(){
    this.serviceAlunos.AtualizarAlunoNalista(this.salvarDadosAlterado())
    history.back();
  }

  ngOnInit() {

  }
  capturarId(){
    this.route.params.subscribe(params => {
      if(params != undefined){
        this.alunoId = params['id'];
      }else{
        throw console.error("Aluno não identificado");
      }
      })
  }

  carregarDados(alunoCarregado:Aluno){
    this.nome = alunoCarregado.nome;
    this.dataNascimento = alunoCarregado.dataNascimento; 
    this.sexo = alunoCarregado.sexo;
    this.autorizacaoDeImagem = alunoCarregado.autorizacaoDeImagem;
  }

  salvarDadosAlterado(): Aluno{
    this.alunoAtualizado = this.serviceAlunos.findBydId(this.alunoId)
    this.alunoAtualizado.nome = this.nome;
    this.alunoAtualizado.dataNascimento = this.dataNascimento;
    this.alunoAtualizado.sexo = this.sexo;
    this.alunoAtualizado.autorizacaoDeImagem = this.autorizacaoDeImagem;
    return this.alunoAtualizado;
  }
}
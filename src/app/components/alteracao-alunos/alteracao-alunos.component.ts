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
import { ServiceMensagemGlobal } from '../../services/mensagens_global';


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

  alunoId: number | undefined;

  nome: String;
  dataNascimento: Date;
  sexo: String;
  autorizacaoDeImagem: Boolean;

  
  constructor(private serviceAlunos: ServiceAlunos, private route: ActivatedRoute, private serviceMensagemGlobal: ServiceMensagemGlobal){
    this.capturarId();
  }

  onSubmit(){
    let novoAluno: Aluno = new Aluno(this.nome, this.dataNascimento,this.sexo,this.autorizacaoDeImagem)

    this.serviceAlunos.atualizarAlunoNalista(this.alunoId, novoAluno).subscribe(
      {
        next: () => this.serviceMensagemGlobal.showMessage("success","Cadastro", "Os dados do aluno foram atualizados com sucesso."),
        error: (erro) => {
          this.serviceMensagemGlobal.showMessage("success","Cadastro", "Ocorreu um erro. Tente novamente mais tarde"),
          console.log(erro)
        } 
      }
    );

    history.back();
  }
  ngOnInit() {

  }
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
      this.dataNascimento = res.dataNascimento;
      this.sexo = res.sexo;
      this.autorizacaoDeImagem = res.autorizacaoDeImagem;
    });
  }
}
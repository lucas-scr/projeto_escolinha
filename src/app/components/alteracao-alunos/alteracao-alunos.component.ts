import { Component, isStandalone } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ServiceAlunos } from '../../services/service_alunos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
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
export class AlteracaoAlunosComponent {

  

  sexo: String = "M";
  nome: String;
  dataNascimento: Date = new Date()
  autorizacaoDeImagem: Boolean = false;
  aluno: Aluno;

  constructor(private serviceAlunos: ServiceAlunos){
  }

  onSubmit(){
    this.aluno = new Aluno(this.nome,this.dataNascimento, this.autorizacaoDeImagem, this.sexo);
   // this.serviceAlunos.atualizarDadosAluno(this.aluno);
    console.log(Aluno)
  }


}





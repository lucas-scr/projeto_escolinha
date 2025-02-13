import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ServiceAlunos } from '../../services/service_alunos';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-detalhar-alunos',
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
  templateUrl: './detalhar-alunos.component.html',
  styleUrl: './detalhar-alunos.component.css'
})
export class DetalharAlunosComponent {

  alunoId: Number;

  aluno: Aluno;

  constructor(private serviceAluno: ServiceAlunos, private route: ActivatedRoute){
    this.capturarId()
    this.aluno = this.serviceAluno.findBydId(this.alunoId)
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

}

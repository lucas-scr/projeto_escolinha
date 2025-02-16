import { Component, isStandalone, LOCALE_ID, OnInit } from '@angular/core';
import { ServiceAlunos } from '../../services/service_alunos';

import { Router, RouterLink, RouterModule } from '@angular/router';
import { Aluno } from '../../model/Alunos';
import { PrimengImports } from '../../shared/primengImports.module';
import { ServiceMensagemGlobal } from '../../services/mensagens_global';

@Component({
  selector: 'app-cadastro-alunos',
  imports: [
    PrimengImports,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './cadastro-alunos.component.html',
  styleUrl: './cadastro-alunos.component.css',
  providers: [
    ServiceMensagemGlobal
  ]

})
export class CadastroAlunosComponent implements OnInit {

  sexo: String = "M";
  nome: String;
  dataNascimento: Date = new Date()
  autorizacaoDeImagem: Boolean = false;
  aluno: Aluno;  

  constructor(private serviceAlunos: ServiceAlunos, private router: Router, private serviceMensagemGlobal: ServiceMensagemGlobal){
  }

  ngOnInit(){

  }

  onSubmit(){
    this.aluno = new Aluno(this.nome,this.dataNascimento, this.autorizacaoDeImagem, this.sexo);
    this.serviceAlunos.adicionarAlunosNalista(this.aluno);
    this.serviceMensagemGlobal.showMessage("success","Cadastro", "Aluno cadastrado com sucesso.")
    this.router.navigate(['/alunos'])
  }


}

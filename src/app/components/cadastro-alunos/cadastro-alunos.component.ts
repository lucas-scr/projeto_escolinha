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
  autorizacaoDeImagem: boolean = false;

  constructor(private serviceAlunos: ServiceAlunos, private router: Router, private serviceMensagemGlobal: ServiceMensagemGlobal){
  }

  ngOnInit(){

  }

  onSubmit(){
    let alunoNovo = new Aluno(this.nome,this.dataNascimento,this.sexo, this.autorizacaoDeImagem );
    this.serviceAlunos.adicionarAlunoNaLista(alunoNovo).subscribe(
      res =>{
        console.log("Adicionad com sucesso", res)
      }
    );
    this.serviceMensagemGlobal.showMessage("success","Cadastro", "Aluno cadastrado com sucesso.")
    this.router.navigate(['/alunos'])
  }


}

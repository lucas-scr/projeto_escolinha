import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../../interfaces/atividades';
import { PrimengImports } from '../../../shared/primengImports.module';
import { RouterLink, RouterModule } from '@angular/router';
import { Materia } from '../../../interfaces/materias';
import { ServiceMateria } from '../../../services/service_materias';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { FileUploadEvent } from 'primeng/fileupload';



@Component({
  selector: 'app-cadastrar-atividades',
  imports: [PrimengImports, RouterModule, RouterLink],
  templateUrl: './cadastrar-atividades.component.html',
  styleUrl: './cadastrar-atividades.component.css',
})
export class CadastrarAtividadesComponent implements OnInit {


  materiaSelecaoPadrao: Materia = {nome: 'Selecione', id: null}
  codigo: String;
  materia: number;
  arquivo: Blob;

  listaMaterias: Materia[] | undefined;
  materiaSelecionada: Materia | undefined;

  constructor(private serviceMaterias: ServiceMateria, private serviceMensagemGlobal: ServiceMensagemGlobal) {
   
  }

  ngOnInit() {
    this.materiaSelecionada = this.materiaSelecaoPadrao;

    this.serviceMaterias.getMaterias().subscribe({
      next: (materias) => {
        this.listaMaterias = materias
      },
      error: (erro) => console.log(erro),
    });
  }

  onSubmit() {}


  onUpload(event: FileUploadEvent){
    if (event.files && event.files.length > 0) {
      this.arquivo = event.files[0]; 
      this.serviceMensagemGlobal.showMessage(
        'info',
        'Upload de arquivo', 
        'O upload do arquivo foi inserido com sucesso.'
      );
    }
  }
}

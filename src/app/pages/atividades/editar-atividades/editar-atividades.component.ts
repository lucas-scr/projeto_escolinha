import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';
import { Atividade } from '../../../interfaces/atividades';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { ServiceAtividades } from '../../../services/service_atividades';
import { ServiceMateria } from '../../../services/service_materias';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Materia } from '../../../interfaces/materias';
import { PrimengImports } from '../../../shared/primengImports.module';

@Component({
  selector: 'app-editar-atividades',
  imports: [PrimengImports, RouterModule, RouterLink],
  templateUrl: './editar-atividades.component.html',
  styleUrl: './editar-atividades.component.css',
})
export class EditarAtividadesComponent implements OnInit, OnDestroy {


  @ViewChild ('fileUpload') fileUpload!: any;

  idAtividade: number;
  codigo: string;
  descricao: string;
  url: string;

  listaMaterias: Materia[] | undefined;
  materiaSelecionada: Materia | undefined;

  nomeArquivo: string;
  isImage: boolean = false;
  arquivoUrl: string | null = null;
  tipoArquivo: string;
  arquivoBlob: Blob;

  constructor(
    private serviceMaterias: ServiceMateria,
    private serviceMensagemGlobal: ServiceMensagemGlobal,
    private serviceAtividade: ServiceAtividades,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.capturarId();
    this.carregarMaterias();
  }

  onSubmit() {
     if (this.arquivoBlob == null && this.url == null) {
      this.serviceMensagemGlobal.showMessage(
        'error',
        'Erro',
        'Informe uma URL ou o arquivo para a atividade.'
      );
    } else {
      let atividadeAtualizada: Atividade = {
        codigo: this.codigo,
        materia: this.materiaSelecionada,
        arquivo: this.arquivoBlob,
        descricao: this.descricao,
        url: this.url,
        id: this.idAtividade,
      };
      this.atualizarDados(this.idAtividade, atividadeAtualizada);
    }
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      this.isImage = file.type.startsWith('image/');

      this.nomeArquivo = file.name;
      this.tipoArquivo = file.type;

      if (file.type === 'application/pdf') {
        if (this.arquivoUrl) {
          URL.revokeObjectURL(this.arquivoUrl);
        }
        const reader = new FileReader();
        reader.onload = () => {
          const pdfBytes = new Uint8Array(reader.result as ArrayBuffer);
          this.arquivoBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          this.arquivoUrl = URL.createObjectURL(file);
        };
        reader.readAsArrayBuffer(file);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.arquivoBlob = new Blob([reader.result as ArrayBuffer], {
            type: file.type,
          });
          this.arquivoUrl = URL.createObjectURL(file);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }

  carregarDadosAtividade(id: Number) {
    this.serviceAtividade.findById(id).subscribe({
      next: (atividade) => {
        this.idAtividade = atividade.id;
        this.codigo = atividade.codigo;
        this.materiaSelecionada = atividade.materia;
        this.descricao = atividade.descricao;
        this.url = atividade.url;
        if (atividade.arquivo) {
          this.arquivoBlob = new Blob([atividade.arquivo]);
          this.arquivoUrl = URL.createObjectURL(this.arquivoBlob);
        }
      },
      error: () => {
        this.serviceMensagemGlobal.showMessage(
          'error',
          'Erro',
          'Não conseguimos identificar a atividade'
        );
        this.router.navigate(['/atividades']);
      },
    });
  }

  capturarId() {
    this.route.params.subscribe((params) => {
      if (params != undefined) {
        this.idAtividade = params['id'];
        this.carregarDadosAtividade(this.idAtividade);
      } else {
        throw console.error('Atividade não identificada');
      }
    });
  }

  carregarMaterias() {
    this.serviceMaterias.getMaterias().subscribe({
      next: (materias) => {
        this.listaMaterias = materias;
      },
      error: (erro) => console.log(erro),
    });
  }

  atualizarDados(id: Number, atividade: Atividade) {
    this.serviceAtividade.atualizarAtividade(id, atividade).subscribe({
      next: () => {
        this.serviceMensagemGlobal.showMessage(
          'success',
          'Sucesso!',
          'Atividade atualizada com sucesso.'
        );
        this.router.navigate(['/atividades']);
      },
      error: (error) => {
        this.serviceMensagemGlobal.showMessage(
          'error',
          'Erro!',
          `Ocorreu um erro ao atualizar os dados da atividade. ${error.erro.error}`
        );
        console.log(error);
      },
    });
  }
  ngOnDestroy() {
    if (this.arquivoUrl) {
      URL.revokeObjectURL(this.arquivoUrl);
    }
  }

    limparArquivos() {
    this.arquivoBlob = null;
    this.nomeArquivo = null;
    this.arquivoUrl = null;
    this.isImage =false;
    this.fileUpload.clear(); 
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
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
  idAtividade: number;
  codigo: String;
  dataCriacao: Date;

  listaMaterias: Materia[] | undefined;
  materiaSelecionada: Materia | undefined;

  nomeArquivo: String;
  isImage: boolean = false;
  arquivoUrl: string | null = null;
  tipoArquivo: String;
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
    if (this.arquivoBlob == null || this.arquivoUrl == null) {
      this.serviceMensagemGlobal.showMessage(
        'error',
        'Erro',
        'Informe todos os campos obrigatórios'
      );
    } else {
      let atividadeAtualizada: Atividade = {
        tipoArquivo: this.tipoArquivo,
        codigo: this.codigo,
        materia: this.materiaSelecionada.id,
        nomeMateria: this.materiaSelecionada.nome,
        arquivo: this.arquivoBlob,
        nomeArquivo: this.nomeArquivo,
        dataCriacao: this.dataCriacao,
        id: new Number(this.idAtividade),
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
        this.codigo = atividade.codigo;
        this.materiaSelecionada = {
          nome: atividade.nomeMateria,
          id: atividade.materia,
        };
        this.nomeArquivo = atividade.nomeArquivo || 'Arquivo anexado';
        this.dataCriacao = new Date(atividade.dataCriacao);


        if (atividade.arquivo) {
          this.tipoArquivo = atividade.tipoArquivo;
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
          'Ocorreu um erro ao atualizar os dados da atividade.'
        );
        this.router.navigate(['/atividades']);
        console.log(error);
      },
    });
  }
  ngOnDestroy() {
    if (this.arquivoUrl) {
      URL.revokeObjectURL(this.arquivoUrl);
    }
  }
}

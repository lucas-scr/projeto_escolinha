import { Component, OnDestroy, OnInit } from '@angular/core';
import { Atividade } from '../../../interfaces/atividades';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Materia } from '../../../interfaces/materias';
import { ServiceMateria } from '../../../services/service_materias';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { FileUploadEvent } from 'primeng/fileupload';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ServiceAtividades } from '../../../services/service_atividades';

@Component({
  selector: 'app-cadastrar-atividades',
  imports: [PrimengImports, RouterModule, RouterLink],
  templateUrl: './cadastrar-atividades.component.html',
  styleUrl: './cadastrar-atividades.component.css',
})
export class CadastrarAtividadesComponent implements OnInit, OnDestroy {
  materiaSelecaoPadrao: Materia = { nome: 'Selecione', id: null };
  codigo: String;
  dataCadastro: Date = new Date();

  listaMaterias: Materia[] | undefined;
  materiaSelecionada: Materia | undefined;

  nomeArquivo: String;
  isImage: boolean = false;
  arquivoUrl: string | null = null;
  arquivoBlob: Blob | null = null;
  

  constructor(
    private serviceMaterias: ServiceMateria,
    private serviceMensagemGlobal: ServiceMensagemGlobal,
    private serviceAtividade: ServiceAtividades,
    private router: Router
  ) {}

  ngOnInit() {
    this.materiaSelecionada = this.materiaSelecaoPadrao;

    this.serviceMaterias.getMaterias().subscribe({
      next: (materias) => {
        this.listaMaterias = materias;
      },
      error: (erro) => console.log(erro),
    });
  }

  onSubmit() {
    if (this.arquivoBlob == null || this.arquivoUrl == null) {
      this.serviceMensagemGlobal.showMessage(
        'error',
        'Erro',
        'Informe todos os campos obrigatórios'
      );
    } else {
      let atividadeCadastrada: Atividade = {
        codigo: this.codigo,
        materia: this.materiaSelecionada.id,
        nomeMateria: this.materiaSelecionada.nome,
        dataCriacao: new Date(),
        arquivo: this.arquivoBlob,
        nomeArquivo: this.nomeArquivo
      };

      this.cadastrarAtividade(atividadeCadastrada);

    }
  }

  onUpload(event: FileUploadEvent) {}

  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      this.isImage = file.type.startsWith('image/');

      this.nomeArquivo = file.name;

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
  cadastrarAtividade(atividade: Atividade){
    this.serviceAtividade.cadastrarAtividade(atividade).subscribe({
      next: () => {
        this.serviceMensagemGlobal.showMessage(
          'success',
          'Sucesso!',
          'A atividade foi salva com sucesso.'
        );
        this.router.navigate(['/atividades']);
      },
      error: (erro) => {
        this.serviceMensagemGlobal.showMessage(
          'error',
          'Erro',
          'Não foi possível realizar o cadastro.'
        );
        console.log(erro);
      },
    });
  }
  ngOnDestroy() {
    if (this.arquivoUrl) {
      URL.revokeObjectURL(this.arquivoUrl);
    }
  }
}

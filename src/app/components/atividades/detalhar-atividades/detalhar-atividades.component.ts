import { Component, OnInit } from '@angular/core';
import { PrimengImports } from '../../../shared/primengImports.module';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Materia } from '../../../interfaces/materias';
import { ServiceMateria } from '../../../services/service_materias';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { ServiceAtividades } from '../../../services/service_atividades';

@Component({
  selector: 'app-detalhar-atividades',
  imports: [PrimengImports, RouterModule, RouterLink],
  templateUrl: './detalhar-atividades.component.html',
  styleUrl: './detalhar-atividades.component.css',
})
export class DetalharAtividadesComponent implements OnInit {
  idAtividade: number;
  codigo: String;
  dataCriacao: Date;

  listaMaterias: Materia[] | undefined;
  materiaSelecionada: Materia | undefined;

  nomeArquivo: String;
  isImage: boolean = false;
  arquivoUrl: string | null = null;
  arquivoBlob: Blob;
  tipoArquivo: String;

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
          this.carregarArquivoBlob(atividade.id);
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

  carregarArquivoBlob(id: Number) {
    this.serviceAtividade.findArquivoByAtividade(id).subscribe({
      next: (blob) => {
        if (blob instanceof Blob) {
          this.arquivoBlob = blob;
          this.arquivoUrl = URL.createObjectURL(this.arquivoBlob);
        }
      },
      error: (err) => {
        console.log(err);
        this.serviceMensagemGlobal.showMessage(
          'error',
          'Erro',
          'Não conseguimos identificar o arquivo'
        );
      },
    });
  }
  abrirArquivo() {
    if (this.arquivoUrl) {
      const novaGuia = window.open(this.arquivoUrl, '_blank');
      if (!novaGuia) {
        console.error('Não foi possível abrir a nova guia');
      }
    } else {
      console.error('URL do arquivo não disponível');
    }
  }
}

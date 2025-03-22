import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagamento } from '../../../interfaces/pagamentos';
import { ServicePagamentos } from '../../../services/service_pagamentos';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';
import { PrimengImports } from '../../../shared/primengImports.module';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';
import { MoedaPipe } from '../../../mascaras.pipe';


@Component({
  selector: 'app-listar-pagamentos',
  imports: [PrimengImports, MoedaPipe],
  templateUrl: './listar-pagamentos.component.html',
  styleUrl: './listar-pagamentos.component.css',
  providers: [ConfirmationService],
  
})
export class ListarPagamentosComponent implements OnInit {
  filtroPesquisa: string;
  loading: boolean = true;
  isModalDeleteOn: false;
  isModalCancelarVisible: false;
  opcoesDeAcoes: MenuItem[] | undefined;
  itemId: number;
  @ViewChild('menu') menu!: Menu;
  

  motivoCancelamento: string;

  listaPagamentos: Pagamento[] = [];

  constructor(
    private servicePagamentos: ServicePagamentos,
    private msgGlobais: ServiceMensagemGlobal,
    private router: Router,
    private confirmationService: ConfirmationService
    
  ) {}

  ngOnInit() {
    this.carregarLista();
    this.carregarOpcoesItem();
    this.loading = false;

  }

  carregarLista() {
    this.servicePagamentos.getPagamentos().subscribe({
      next: (pagamentos) => (this.listaPagamentos = pagamentos),
      error: (err) => {
        console.log(err);
        this.msgGlobais.showMessage(
          'error',
          'Erro',
          'Não foi possível carregar os pagamentos.'
        );
      },
    });
  }

  removerPagamento(id: number) {
    this.servicePagamentos.deletePagamento(id).subscribe({
      next: () =>
        this.msgGlobais.showMessage(
          'success',
          'Removido',
          'O pagamento foi removido com sucesso.'
        ),
    });
  }

  cancelarPagamento(id: number) {
    this.servicePagamentos.deletePagamento(id).subscribe({
      next: () =>
        this.msgGlobais.showMessage(
          'success',
          'Cancelado!',
          'O pagamento foi cancelado com sucesso.'
        ),
    });
  }

  abrirMenu(event: any, id: number) {
    this.itemId = id;
    this.menu.toggle(event);
  }

  confirmarRemover() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja remover o pagamento?',
      header: 'Remover pagamento',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.removerPagamento(this.itemId);
      },
    });
  }

  carregarOpcoesItem() {
    this.opcoesDeAcoes = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Detalhar',
            icon: 'pi pi-eye',
            command: () =>
              this.router.navigate(['/detalhar-pagamento', this.itemId]),
          },
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () =>
              this.router.navigate(['/editar-pagamento', this.itemId]),
          },
          {
            label: 'Cancelar',
            icon: 'pi pi-times'
            // command: () => this.confirmarCancelamento(),
          },
          {
            label: 'Remover',
            icon: 'pi pi-trash',
            command: () => this.confirmarRemover(),
          },
        ],
      },
    ];
  }
}

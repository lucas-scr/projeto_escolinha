import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimengImports } from '../../shared/primengImports.module';
import { ServiceContratos } from '../../services/service_contratos';
import { Contrato } from '../../model/Contrato';
import { TelefonePipe, MoedaPipe } from '../../mascaras.pipe';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-lista-contratos',
  imports: [
    PrimengImports, 
    TelefonePipe,
    MoedaPipe

  ],
  templateUrl: './lista-contratos.component.html',
  styleUrl: './lista-contratos.component.css',
  providers: [ServiceContratos,   MessageService],
})
export class ListaContratosComponent {
  opcoesDeAcoes: MenuItem[] | undefined;
  listaContratos: Contrato[];
  status: any[];
  searchValue: String;
  responsaveis: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  itemId: Number;
  @ViewChild('menu') menu!: Menu;

  constructor(
    private contratosService: ServiceContratos,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listaContratos = this.contratosService.listarContrato();
    this.loading = false;

    this.status = [
      { label: 'Iniciado', value: 'iniciado' },
      { label: 'Finalizado', value: 'finalizado' },
    ];

    this.responsaveis = [{ name: 'Amy Elsner' }, { name: 'Anna Fali' }];

    this.opcoesDeAcoes = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Detalhar',
            icon: 'pi pi-eye',
          },
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Remover',
            icon: 'pi pi-trash',
            command: () => this.removerAlunoDaLista(this.itemId),
          },
        ],
      },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  abrirMenu(event: Event, id: any) {
    this.itemId = id;
    this.menu.toggle(event); // Exibe o menu no local correto
  }

  removerAlunoDaLista(id: Number){
    this.contratosService.removerContratoDaLista(id);
    this.showMessage("success", "Removido!", "Contrato removido com sucesso.")
  }

  showMessage(tipoMensagem: String, titulo: String,mensagem: String){
    this.messageService.add({ severity: `${tipoMensagem}`, summary: `${titulo}`, detail: `${mensagem}`, life: 3000 });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengImports } from '../../../shared/primengImports.module';
import { Atividade } from '../../../interfaces/atividades';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ServiceAtividades } from '../../../services/service_atividades';

@Component({
  selector: 'app-listar-atividades',
  imports: [PrimengImports],
  templateUrl: './listar-atividades.component.html',
  styleUrl: './listar-atividades.component.css',
  providers: [ServiceAtividades, ConfirmationService]
})
export class ListarAtividadesComponent implements OnInit {

  searchValue: String;
  itemId: number;

  listaAtividades: Atividade[] = [];

  loading: boolean = true;

  opcoesDeAcoes: MenuItem[] | undefined;

  @ViewChild('menu') menu!: Menu;
  
  constructor(private serviceAtividades: ServiceAtividades ,private router: Router){

  }

  ngOnInit(): void {


    this.loading = false;

    this.carregarAtividades()

      
    this.opcoesDeAcoes = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Detalhar',
            icon: 'pi pi-eye',
            command: () => this.router.navigate(['/detalhar-atividade', this.itemId]),
          },
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => this.router.navigate(['/editar-atividade', this.itemId]),

          },
          {
            label: 'Remover',
            icon: 'pi pi-trash',
            // command: () => this.removerAlunoDaLista(this.itemId),
            command: () => this.confirmarRemover(),
          },
        ],
      },
    ];
  }


  confirmarRemover(){

  }

  abrirMenu(event: any, id: number){
    this.itemId = id;
    this.menu.toggle(event); // Exibe o menu no local correto
  }

  carregarAtividades(){
    this.serviceAtividades.getAtividades().subscribe(
    {next: (atividades) => this.listaAtividades = atividades,
      error: (erro) => console.log(erro)

    }
    )
  }
}

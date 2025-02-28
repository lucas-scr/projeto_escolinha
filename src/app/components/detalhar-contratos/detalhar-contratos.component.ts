import { Component } from '@angular/core';
import { ServiceMensagemGlobal } from '../../services/mensagens_global';
import { ServiceContratos } from '../../services/service_contratos';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contrato } from '../../model/Contrato';
import { PrimengImports } from '../../shared/primengImports.module';

@Component({
  selector: 'app-detalhar-contratos',
  imports: [PrimengImports, RouterLink],
  templateUrl: './detalhar-contratos.component.html',
  styleUrl: './detalhar-contratos.component.css'
})
export class DetalharContratosComponent {

  modalAdicionar: boolean = false;
  
    contratoId: Number;
    contratoCarregado: Contrato;
    contato: Number = 12345667111
  
    
    autorizacaoDeImagem: Boolean;
  
    
    diasSelecionados: string[] = [];
  
  
    constructor(
      private messageService: ServiceMensagemGlobal,
      private contratoService: ServiceContratos,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.capturarId();
  
    }
  
    ngOnInit() {
     this.capturarId();
    }

  

    carregarDadosContrato(id: Number) {
      this.contratoService.findById(id).subscribe({
        next: (contrato) => {
          this.contratoCarregado = contrato;
          this.contratoCarregado.dataInicio = new Date (contrato.dataInicio);
        },
        error: (erro) => {
          this.messageService.showMessage(
            'danger',
            'Erro',
            'Não conseguimos recuperar os dados do contrato.'
          );
          console.log(erro);
        },
  
      });
    }
    capturarId(){
      this.route.params.subscribe((params)=> {
        if(params != undefined){
          this.contratoId = params['id'];
          this.carregarDadosContrato(this.contratoId)
  
        }else{
          throw console.error('Aluno não identificado');
        }
      })
    }
  
}

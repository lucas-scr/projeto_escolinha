import { Component, Input, input, Output } from '@angular/core';
import { PrimengImports } from '../../../shared/primengImports.module';
import { ServicePagamentos } from '../../../services/service_pagamentos';
import { Pagamento } from '../../../interfaces/pagamentos';
import { ServiceMensagemGlobal } from '../../../services/mensagens_global';

@Component({
  selector: 'app-cancelar-pagamento',
  imports: [PrimengImports],
  templateUrl: './cancelar-pagamento.component.html',
  styleUrl: './cancelar-pagamento.component.css'
})
export class CancelarPagamentoComponent {

  motivoCancelamento: string;

  @Input() idPagamento: number;
  @Input() pagamento: Pagamento;
  @Output()   visible: boolean;

  constructor(private servicePagamento: ServicePagamentos, private msgGlobal: ServiceMensagemGlobal){
  }

  cancelarPagamento(){
    this.servicePagamento.cancelarPagamento(this.idPagamento,this.pagamento, this.motivoCancelamento).subscribe({
      next: () => {
        this.msgGlobal.showMessage('success', 'Sucesso!','Pagamento cancelado com sucesso.');
        this.visible = false;
      },
      error: (err) => {
        this.msgGlobal.showMessage('error', 'Erro!','Ocorreu um erro e o pagamento não foi cancelado.')
        this.visible = false;
      }
    })
  }
}

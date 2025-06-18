import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiasDaSemana } from '../enumDiasDaSemana';
import { Aula } from '../../interfaces/aula';
import { PrimengImports } from '../primengImports.module';



@Component({
  selector: 'app-modal-adicionar-dia',
  imports: [PrimengImports],
  templateUrl: './modal-adicionar-dia.component.html',
  styleUrl: './modal-adicionar-dia.component.css'
})
export class ModalAdicionarDiaComponent {

  @Input() visible: boolean = false;
  @Input() aulasAdicionadas: Aula[] = [];

  @Output() fechar = new EventEmitter<void>();
  @Output() adicionar = new EventEmitter<{ dia: string, horario: Date }>();



  diaSelecionado: string;
  horarioInicio_aula: Date;



  dias: String[] = [
    DiasDaSemana.SEGUNDA,
    DiasDaSemana.TERCA,
    DiasDaSemana.QUARTA,
    DiasDaSemana.QUINTA,
    DiasDaSemana.SEXTA,
  ];

  constructor() {}

  onAdicionar() {
    if (this.diaSelecionado && this.horarioInicio_aula) {
      this.adicionar.emit({
        dia: this.diaSelecionado,
        horario: this.horarioInicio_aula,
      })
      this.limparDadosModal()
      this.onFechar();
    }

  }

  onFechar() {
    this.fechar.emit();
    this.visible = false;
  }

  abrirModalAdicionarAula() {
    this.limparDadosModal();
    this.visible = true;
  }

  limparDadosModal() {
    this.diaSelecionado = undefined;
    this.horarioInicio_aula = undefined;
  }


  diasDisponiveis(): String[] {
    return this.dias.filter((dia) => {
      const ocupado = this.aulasAdicionadas.some((aula) => aula.diaSemana === dia);
      return !ocupado;
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Remove tudo que não for número
    let cleaned = value.replace(/\D/g, '');

    // Formato (XX) XXXXX-XXXX para celulares
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    // Formato (XX) XXXX-XXXX para telefones fixos
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value; // Retorna sem formatação se o tamanho for diferente
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    let cleaned = value.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value;
  }
}

@Pipe({
  name: 'moeda',
})
export class MoedaPipe implements PipeTransform {
  transform(
    value: number | string,
    simbolo: string = 'R$',
    decimal: number = 2
  ): string {
    if (value === null || value === undefined) return '';
    let valor: number =
      typeof value === 'string'
        ? parseFloat(value.replace(/[^\d.-]/g, ''))
        : value;
    if (isNaN(valor)) return '';
    valor = valor / 100;
    return `${simbolo} ${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    })}`;
  }
}

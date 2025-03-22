import { Contrato } from "../model/Contrato";

export interface Pagamento {
    id?: number;
    valor: number;
    valorPago: number;
    dataPagamento: Date;
    dataVencimento: Date;
    contrato: Contrato;
    situacao: string;
    meioDePagamento: string;
    motivoCancelamento?: string;
}
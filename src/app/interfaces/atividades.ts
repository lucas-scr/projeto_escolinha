import { Materia } from "./materias";

export interface Atividade{
    codigo: string;
    materia: Materia;
    nomeArquivo: string;
    arquivo?: Blob;
    url?: string;
    tipoArquivo: string;
    descricao: string;
    dataCriacao?: Date;
    id?: Number;
}
import { Materia } from "./materias";

export interface Atividade{
    codigo: String;
    materia: number;
    nomeMateria: String;
    nomeArquivo: String;
    arquivo: Blob;
    tipoArquivo: String;
    descricao: String;
    dataCriacao?: Date;
    id?: Number
}
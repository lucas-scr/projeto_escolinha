import { Materia } from "./materias";

export interface Atividade{
    codigo: String;
    materia: number;
    nomeMateria: String;
    nomeArquivo: String;
    arquivo: Blob;
    dataCriacao?: Date;
    id?: Number
}
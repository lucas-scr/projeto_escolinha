import { Materia } from "./materias";

export interface Atividade{
    id: number
    codigo: String;
    materia: String;
    arquivo: Blob;
    dataCriacao: Date;
}